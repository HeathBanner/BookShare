using System;
using MongoDB.Bson.Serialization.Attributes;

namespace BookShare.Models
{
    public class Region
    {
        [BsonId]
        public Guid Id { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Study { get; set; }
        public string Owner { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Condition { get; set; }
        public string EMedia { get; set; }
    }
}
