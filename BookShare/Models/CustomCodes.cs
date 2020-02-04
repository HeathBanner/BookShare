using System;
using BookShare.Models;

namespace BookShare.Models
{
    public class CustomCodes
    {
        public Users user { get; set; }
        public int statusCode { get; set; }
        public string access_token { get; set; }
    }
}
