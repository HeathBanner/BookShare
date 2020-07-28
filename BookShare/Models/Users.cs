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
        public string Link { get; set; } = string.Empty;
        public Recovery PasswordRecovery { get; set; } = new Recovery();
        public Requests[] Request { get; set; } = new Requests[0];
    }

    public class Recovery
    {
        public bool Active { get; set; }
        public string LastActive { get; set; }
        public string Link { get; set; }
    }

    public class Requests
    {
        public Guid Id { get; set; }
        public string DateRequested { get; set; }
    }
}
