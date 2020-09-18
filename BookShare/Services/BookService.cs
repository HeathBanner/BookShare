using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using BookShare.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BookShare.Services
{
    public class BookService
    {
        private readonly IMongoCollection<Users> _users;
        private readonly IMongoCollection<Region> _books;

        public BookService(IBookDatabaseSettings settings)
        {
            var client = new MongoClient(Environment.GetEnvironmentVariable("ConnectionString"));
            var database = client.GetDatabase(Environment.GetEnvironmentVariable("DatabaseName"));

            Console.WriteLine("\n\n\n {0} \n {1} \n {2} \n\n\n",
                settings.UsersCollectionName, settings.DatabaseName, settings.ConnectionString);

            _users = database.GetCollection<Users>(Environment.GetEnvironmentVariable("UsersCollectionName"));
            _books = database.GetCollection<Region>(Environment.GetEnvironmentVariable("BooksCollectionName"));
        }

        public HttpResponseMessage Create(Users user)
        {
            var filter = Builders<Users>.Filter.Eq("Username", "Heath");
            var update = Builders<Users>.Update
                .Set("Email", "Test")
                .Push("Posted", user.Posted[0]);

            _users.UpdateOne(filter, update);

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        public async Task<CustomCodes> GetById(string id)
        {
            var filter = Builders<Region>.Filter.Eq("Id", new Guid(id));
            var result = await _books.Find(filter).FirstOrDefaultAsync();

            return new CustomCodes
            {
                statusCode = 200,
                book = result
            };
        }

        public async Task<CustomCodes> GetBooks(Region book, int page, string sale, string trade)
        {
            var builder = Builders<Region>.Filter;
            int index = 0;

            if (page > 1)
            {
                int newPage = page - 1;
                index = newPage * 3;
            }

            var filter = builder.Regex("Title", new BsonRegularExpression(book.Title, "i"))&builder.Eq("State", book.State)&builder.Eq("City", book.City);
            
            if (sale == "Y" && trade == "N") filter = builder.Gt("Price", 0);
            else if (sale == "N" && trade == "Y") filter = builder.Eq("Price", 0);

            var result = await _books.Find(filter).Skip(index).Limit(3).ToListAsync();

            return new CustomCodes
            {
                statusCode = 200,
                books = result
            };
        }

        public async Task<CustomCodes> GetBooks(string id)
        {
            var builder = Builders<Region>.Filter;
            var filter = builder.Eq("id", new Guid(id));
            var result = await _books.Find(x => x.Id == new Guid(id)).ToListAsync();

            if (result.Count < 1) return new CustomCodes { statusCode = 404 };

            return new CustomCodes {
                statusCode = 200,
                books = result
            };
        }

        public List<Region> BookFilter(string Title, string State, string City, string Study, string Condition, string ISBN, string CourseId, out List<Region> document)
        {
            var builder = Builders<Region>.Filter;
            var filter = builder.Eq("Title", Title) & builder.Eq("State", State) & builder.Eq("City", City);
            
            if (Study != "null") filter = filter & builder.Eq("Study", Study);
            if (Condition != "null") filter = filter & builder.Eq("Condition", Condition);
            if (ISBN != "null") filter = filter & builder.Eq("ISBN", ISBN);
            if (CourseId != "null") filter = filter & builder.Eq("CourseId", CourseId);

            var result = _books.Find(filter).ToList();

            return document = result;
        }

        public async Task<CustomCodes> PostBook(Region book)
        {
            Console.WriteLine("\n\n\n SERVICES \n\n\n");
            await _books.InsertOneAsync(book);

            var filter = Builders<Users>.Filter.Eq(x => x.Username, book.Owner);
            var options = new FindOneAndUpdateOptions<Users>() { ReturnDocument = ReturnDocument.After };
            var update = Builders<Users>.Update.Push(x => x.Posted, book);

            var result = await _users.FindOneAndUpdateAsync(filter, update, options);

            return new CustomCodes {
                statusCode = 201,
                user = result
            };
        }

        public async Task<CustomCodes> EditBook(Region book)
        {
            var builders = Builders<Users>.Filter;

            var bFilter = Builders<Region>.Filter.Eq("Id", book.Id);
            var bResult = await _books.FindOneAndReplaceAsync(bFilter, book);

            var uFilter = builders.And(
                builders.Eq(x => x.Username, book.Owner),
                builders.ElemMatch(x => x.Posted, y => y.Id == book.Id));
            var uOptions = new FindOneAndUpdateOptions<Users>() { ReturnDocument = ReturnDocument.After };
            var uUpdate = Builders<Users>.Update.Set(x => x.Posted[-1], book);
            var uResult = await _users.FindOneAndUpdateAsync(uFilter, uUpdate, uOptions);

            return new CustomCodes
            {
                statusCode = 200,
                user = uResult
            };
        }

        public async Task<CustomCodes> FetchByList(Region book, int page, string sale, string trade)
        {
            var builder = Builders<Region>.Filter;
            int index = 0;

            if (page > 1)
            {
                int newPage = page - 1;
                index = newPage * 3;
            }

            Console.WriteLine("\n\n\n {0} \n\n\n", index);

            var filter = builder.In("Title", book.LFBooks)
                &
                builder.Eq("State", book.State)
                &
                builder.Eq("City", book.City);

            if (sale == "Y" && trade == "N") filter = builder.Gt("Price", 0);
            else if (sale == "N" && trade == "Y") filter = builder.Eq("Price", 0);

            var result = await _books.Find(filter).Skip(index).Limit(3).ToListAsync();

            return new CustomCodes
            {
                statusCode = 200,
                books = result
            };
        }
    }
}
