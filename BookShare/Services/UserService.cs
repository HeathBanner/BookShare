using System;
using System.Net;
using System.Net.Http;
using BookShare.Models;
using MongoDB.Driver;

namespace BookShare.Services
{
    public class UserService
    {
        private readonly IMongoCollection<Users> _users;

        public UserService(IBookDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<Users>(settings.UsersCollectionName);
        }

        public HttpResponseMessage Register(Users user)
        {
            var filter = Builders<Users>.Filter;
            var findFilter = filter.Or(
                    filter.Eq("Username", user.Username),
                    filter.Eq("Email", user.Email)
                    );
            var findQuery = _users.Find(findFilter).ToList();

            Console.WriteLine("\n\n\n {0} \n\n\n", findQuery.Count);

            if (findQuery.Count >= 1) return new HttpResponseMessage(HttpStatusCode.Forbidden);

            _users.InsertOne(user);

            return new HttpResponseMessage(HttpStatusCode.Created);
        }

        public HttpResponseMessage Login(Users user)
        {
            var filter = Builders<Users>.Filter;
            var findFilter = filter.Eq("Email", user.Email);
            var findQuery = _users.Find(findFilter).ToList();

            Console.WriteLine("\n\n\n {0} \n\n\n", findQuery.Count);

            if (findQuery.Count == 0) return new HttpResponseMessage(HttpStatusCode.NotFound);
            if (findQuery[0].Password != user.Password) return new HttpResponseMessage(HttpStatusCode.Forbidden);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
