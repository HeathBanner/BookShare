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
        public HttpResponseMessage Register(Users user)
        {
            var filter = Builders<Users>.Filter;
            var findFilter = filter.Or(
                    filter.Eq("Username", user.Username),
                    filter.Eq("Email", user.Email)
                    );
            var findQuery = _users.Find(findFilter).ToList();

            if (findQuery.Count >= 1) return new HttpResponseMessage(HttpStatusCode.Forbidden);

            _users.InsertOne(user);

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        public List<Users> Login(Users user)
        {
            var filter = Builders<Users>.Filter;
            var findFilter = filter.Eq("Email", user.Email);
            var findQuery = _users.Find(findFilter).ToList();

            Console.WriteLine("\n\n\n {0} \n\n\n", findQuery.Count);

            return findQuery;
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

        public async Task<bool> UpdateEmail(Users user)
        {
            var filter = Builders<Users>.Filter.Eq("Username", user.Username);
            var update = Builders<Users>.Update.Set("Email", user.Email);

            await _users.UpdateOneAsync(filter, update);

            return true;
        }
    }
}
