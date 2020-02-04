using System;
using MongoDB.Bson.Serialization.Attributes;

namespace BookShare.Models
{
    public class Book
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Condition { get; set; }
        public string EMedia { get; set; }
        public string ISBN { get; set; }
        public string CourseId { get; set; }
    }
}
