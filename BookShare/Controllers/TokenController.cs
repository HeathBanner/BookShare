using System;
using System.Net.Http;
using BookShare.Models;
using BookShare.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BookShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly TokenService _tokenService;

        public TokenController(TokenService tokenService)
        {
            _tokenService = tokenService;
        }
    
        [HttpPost]
        [Route("generate")]
        public async Task<IActionResult> Create([FromBody] Users user)
        {
            if (_tokenService.isValidEmailAndPassword(user.Email, user.Password))
            {
                var genToken = await _tokenService.GenerateToken(user.Email);
                return new ObjectResult(genToken);
            }
            else
            {
                return new ObjectResult(new CustomCodes
                {
                    statusCode = 500
                });
            }
        }

        [Route("validate")]
        public async Task<IActionResult> Validate([FromBody] CustomCodes code)
        {
            var result = await _tokenService.ValidateToken(code.access_token);
            if (result.statusCode == 200)
            {
                return new ObjectResult(result);
            }
            else
            {
                return new ObjectResult(new CustomCodes
                {
                    statusCode = 401
                });
            }
        }
    }
}