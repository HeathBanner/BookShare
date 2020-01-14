using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
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
            Console.WriteLine("\n\n\n {0} \n\n\n", user.Posted[0]);

            var filter = Builders<Users>.Filter.Eq("Username", "Heath");
            var update = Builders<Users>.Update
                .Set("Email", "Test")
                .Push("Posted", user.Posted[0]);

            _users.UpdateOne(filter, update);

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        public List<Region> GetBooks(string state, string city, string study, out List<Region> document)
        {
            Console.WriteLine("\n\n\n {0} {1} {2}", state, city, study);

            var builder = Builders<Region>.Filter;
            var filter = builder.And(
                    builder.Eq("State", state),
                    builder.Eq("City", city),
                    builder.Eq("Study", study)
                );

            return document = _books.Find(filter).ToList();
        }

        public List<Region> GetBooks(string title, string study, out List<Region> document)
        {
            var builder = Builders<Region>.Filter;
            var filter = builder.And(
                        builder.Eq("Title", title),
                        builder.Eq("Study", study)
                    );

            return document = _books.Find(filter).ToList();
        }

        public List<Region> GetBooks(string id, out List<Region> document)
        {
            var builder = Builders<Region>.Filter;
            var filter = builder.Eq("id", new Guid(id));
            var result = _books.Find(x => x.Id == new Guid(id)).ToList();

            return document = result;
        }

        public HttpResponseMessage Books(Region book)
        {
            _books.InsertOne(book);

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        //public List<Users> Create(Users user)
        //{
        //    var filter = Builders<Users>.Filter.Eq("Username", "Heath");

        //    var doc = _users.Find(filter).ToList();

        //    Console.WriteLine("\n\n\n RESULT \n {0} \n\n\n", doc);

        //    return doc;
        //}

    }
}
