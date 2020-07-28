using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using BookShare.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace BookShare.Services
{
    public class UserService
    {
        private readonly IMongoCollection<Users> _users;
        private readonly IMongoCollection<Book> _books;

        public UserService(IBookDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<Users>(settings.UsersCollectionName);
            _books = database.GetCollection<Book>(settings.BooksCollectionName);
        }

        public Users GetUser(string id)
        {
            var builder = Builders<Users>.Filter;
            var filter = builder.Eq("Id", new Guid(id));
            var query = _users.Find(filter).ToList();

            if (query.Count == 0) return null;

            return query[0];
        }

        public async Task<CustomCodes> EmailCheck(string email) 
        {
            var filter = Builders<Users>.Filter.Eq("Email", email);
            Users query = await _users.Find(filter).FirstOrDefaultAsync();

            if (query == null)
            {
                return new CustomCodes
                {
                    statusCode = 401,
                    message = "An error occured."
                };
            }

            DateTime dateTime = DateTime.UtcNow.Date;
            string todayTime = dateTime.ToString("dd/MM/yy");

            if (query.PasswordRecovery.LastActive == todayTime)
            {
                return new CustomCodes
                {
                    statusCode = 401,
                    message = "Too many requests for today."
                };
            }
            
            Recovery newObj = new Recovery() { Active = true, LastActive = todayTime };
            var uFilter = Builders<Users>.Filter.Eq("Email", email);
            var update = Builders<Users>.Update.Set(u => u.PasswordRecovery, newObj);

            await _users.UpdateOneAsync(filter, update);

            return new CustomCodes { statusCode = 200 };
        }

        public async Task<CustomCodes> checkRequests(string email, Guid id)
        {
            var filter = Builders<Users>.Filter.Eq("Email", email);
            Users query = await _users.Find(filter).FirstOrDefaultAsync();
            Console.WriteLine("\n\n\n {0} \n\n\n", query);
            if (query == null) 
            {
                return new CustomCodes {
                    statusCode = 500,
                    message = "Something went wrong :("
                };
            }
            foreach (Requests Request in query.Request)
            {
                if (Request.Id == id)
                {
                    return new CustomCodes
                    {
                        statusCode = 401,
                        message = "You've already requested this book."
                    };
                }
            }

            DateTime dateTime = DateTime.UtcNow.Date;
            string todayTime = dateTime.ToString("dd/MM/yy");
            Requests newRequest = new Requests
            { 
                Id = id,
                DateRequested = todayTime
            };

            var uFilter = Builders<Users>.Filter.Eq("Email", email);
            var update = Builders<Users>.Update.Push("Request", newRequest);

            await _users.UpdateOneAsync(filter, update);
            return new CustomCodes { statusCode = 200 };
        }

        public async Task<CustomCodes> Register(Users user)
        {
            var filter = Builders<Users>.Filter;
            var find = filter.Or(
                    filter.Eq("Username", user.Username),
                    filter.Eq("Email", user.Email)
                    );
            var query = await _users.Find(find).FirstOrDefaultAsync();

            if (query != null && query.Email == user.Email)
            {
                return new CustomCodes { statusCode = 401 };
            }

            _users.InsertOne(user);

            return new CustomCodes
            {
                statusCode = 201
            };
        }

        public CustomCodes DeleteBook(string id, string username)
        {
            var filter = Builders<Book>.Filter.Eq("_id", new Guid(id));
            _books.DeleteOne(filter);

            var builder = Builders<Users>.Update;
            
            var update = builder.PullFilter(x => x.Posted, y => y.Id == new Guid(id));
            var options = new FindOneAndUpdateOptions<Users>()
            {
                ReturnDocument = ReturnDocument.After
            };
            var result = _users.FindOneAndUpdate<Users>(u => u.Username == username, update, options);

            return new CustomCodes {
                user = result,
                statusCode = 200
            };
        }

        public async Task<CustomCodes> ValidatePassword(Users user)
        {
            var filter = Builders<Users>.Filter.Eq("Username", user.Username);
            Users query = await _users.Find(filter).FirstOrDefaultAsync();

            if (query.Password == user.Password)
            {
                return new CustomCodes { statusCode = 200 };
            }
            else
            {
                return new CustomCodes { statusCode = 401 };
            }
        }

        public async Task<CustomCodes> UpdatePassword(Users user)
        {
            var filter = Builders<Users>.Filter.Eq("Username", user.Username);
            var update = Builders<Users>.Update.Set("Password", user.Password);

            await _users.UpdateOneAsync(filter, update);

            return new CustomCodes { statusCode = 200 };
        }

        public async Task<CustomCodes> PasswordRecovery(Users user)
        {
            var filter = Builders<Users>.Filter.Eq("Email", user.Email);
            var update = Builders<Users>.Update.Set("Password", user.Password);

            await _users.UpdateOneAsync(filter, update);

            return new CustomCodes { statusCode = 200 };
        }

        public async Task<bool> UpdateEmail(Users user)
        {
            var filter = Builders<Users>.Filter.Eq("Username", user.Username);
            var update = Builders<Users>.Update.Set("Email", user.Email);

            await _users.UpdateOneAsync(filter, update);

            return true;
        }
        
        public async Task<CustomCodes> UpdateLF(Users user)
        {
            var filter = Builders<Users>.Filter.Eq("Username", user.Username);
            var update = Builders<Users>.Update.Set("LFBooks", user.LFBooks);
            var options = new FindOneAndUpdateOptions<Users>()
            {
                ReturnDocument = ReturnDocument.After
            };

            var result = await _users.FindOneAndUpdateAsync(filter, update, options);

            return new CustomCodes
            {
                statusCode = 200,
                user = result
            };
        }

        public async Task<CustomCodes> updateLocation(Users user)
        {
            var filter = Builders<Users>.Filter.Eq("Username", user.Username);
            var update = Builders<Users>.Update
                .Set("City", user.City)
                .Set("State", user.State);
            var options = new FindOneAndUpdateOptions<Users>()
            {
                ReturnDocument = ReturnDocument.After
            };

            var result = await _users.FindOneAndUpdateAsync(filter, update, options);

            return new CustomCodes { statusCode = 200 };
        }
    }
}
