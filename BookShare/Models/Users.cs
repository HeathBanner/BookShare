using System;
using MongoDB.Bson.Serialization.Attributes;

namespace BookShare.Models
{
    public class Users
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Region[] Posted { get; set; }
        public string[] LFBooks { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
