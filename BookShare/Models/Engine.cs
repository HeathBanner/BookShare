using System;
using MongoDB.Driver;

namespace BookShare.Models
{
    public class Engine
    {
        private IMongoDatabase db;
        public Engine(string database)
        {
            var client = new MongoClient();
            db = client.GetDatabase(database);
        }
    }
}
