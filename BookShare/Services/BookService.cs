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
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            Console.WriteLine("\n\n\n {0} \n {1} \n {2} \n\n\n",
                settings.UsersCollectionName, settings.DatabaseName, settings.ConnectionString);

            _users = database.GetCollection<Users>(settings.UsersCollectionName);
            _books = database.GetCollection<Region>(settings.BooksCollectionName);
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

        public List<Region> GetBooks(string title, string state, string city, out List<Region> document)
        {
            var builder = Builders<Region>.Filter;
            var filter = builder.Eq("Title", title) & builder.Eq("State", state) & builder.Eq("City", city);

            return document = _books.Find(filter).ToList();
        }

        public List<Region> GetBooks(string id, out List<Region> document)
        {
            var builder = Builders<Region>.Filter;
            var filter = builder.Eq("id", new Guid(id));
            var result = _books.Find(x => x.Id == new Guid(id)).ToList();

            return document = result;
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

        public CustomCodes Books(Region book)
        {
            _books.InsertOne(book);

            var filter = Builders<Users>.Filter.Eq(x => x.Username, "Heath");
            var options = new FindOneAndUpdateOptions<Users>() { ReturnDocument = ReturnDocument.After };
            var update = Builders<Users>.Update.Push(x => x.Posted, book);

            var result = _users.FindOneAndUpdate(filter, update, options);

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
    }
}
