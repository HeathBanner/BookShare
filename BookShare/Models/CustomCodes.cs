using System;
using System.Collections.Generic;
using BookShare.Models;

namespace BookShare.Models
{
    public class CustomCodes
    {
        public Users user { get; set; }
        public Region book { get; set; }
        public List<Region> books { get; set; }
        public int statusCode { get; set; }
        public string message { get; set; }
        public string access_token { get; set; }
    }
}
