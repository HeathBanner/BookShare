using System;
using MongoDB.Bson.Serialization.Attributes;

namespace BookShare.Models
{
    public class EmailTemplate
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public Region Book { get; set; }
        public string[] LFBooks { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Request { get; set; }
        public string Phone { get; set; }
        public string Link { get; set; }
        public string Switch { get; set; }
    }
}
