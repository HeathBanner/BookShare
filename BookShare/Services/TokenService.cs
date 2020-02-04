using System;
using System.Collections.Generic;
using BookShare.Models;
using MongoDB.Driver;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Linq;

namespace BookShare.Services
{
    public class TokenService
    {
        private readonly IMongoCollection<Users> _users;

        public TokenService(IBookDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<Users>(settings.UsersCollectionName);
        }

        public bool isValidEmailAndPassword(string email, string password)
        {
            Console.WriteLine("\n\n\n {0} \n {1} \n\n\n", email, password);

            var filter = Builders<Users>.Filter.Eq("Email", email);
            var user = _users.Find(filter).ToList();

            if (user.Count == 0)
            {
                Console.WriteLine("\n\n\n {0} \n\n\n", "NULL");
                return false;
            }
            if (user[0].Password == password)
            {
                Console.WriteLine("\n\n\n {0} \n\n\n", "Success");
                return true;
            }
            Console.WriteLine("\n\n\n {0} \n\n\n", "Default");
            return false;
        }

        public async Task<dynamic> GenerateToken(string email)
        {
            // FIGURE OUT HOW TO USE THE QUERIED DOCUMENT'S ID IN CLAIMTYPES    
            var filter = Builders<Users>.Filter.Eq("Email", email);
            Users user = await _users.Find(filter).FirstOrDefaultAsync();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, email),
                new Claim(ClaimTypes.NameIdentifier, email),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),
            };

            var token = new JwtSecurityToken(
                new JwtHeader(
                    new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MyKeyIsSuperSecretButIProbablyWillStillUploadThisToGithubBecauseImStupid")),
                        SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));

            var output = new CustomCodes
            {
                access_token = new JwtSecurityTokenHandler().WriteToken(token),
                statusCode = 200,
                user = user
            };

            return output;
        }

        public async Task<dynamic> ValidateToken(string token)
        {
            var validaionParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MyKeyIsSuperSecretButIProbablyWillStillUploadThisToGithubBecauseImStupid")),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(5)
            };

            try
            {
                new JwtSecurityTokenHandler().ValidateToken(token, validaionParameters, out var newToken);
            }
            catch
            {
                return false;
            }

            var securityToken = new JwtSecurityTokenHandler().ReadToken(token) as JwtSecurityToken;
            var email = securityToken.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;

            var filter = Builders<Users>.Filter.Eq("Email", email);
            Users query = await _users.Find(filter).FirstOrDefaultAsync();

            var result = new CustomCodes
            {
                statusCode = 200,
                user = query
            };

            return result;
        }

    }
}