using System;
using System.Net.Http;
using BookShare.Models;
using BookShare.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using BookShare.Entities;

namespace BookShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly IMailer _mailer;
        private readonly UserService _userService;

        public TokenController(TokenService tokenService, IMailer mailer, UserService userService)
        {
            _tokenService = tokenService;
            _mailer = mailer;
            _userService = userService;
        }

        [HttpGet]
        [Route("ValidatePasswordToken/token={token}")]
        public async Task<IActionResult> ValidatePasswordToken(string token)
        {
            var result = await _tokenService.ValidatePasswordToken(token);
            return new ObjectResult(result);
        }
    
        [Route("email={email}")]
        public async Task<IActionResult> EmailCheck(string email)
        {
            CustomCodes check = await _userService.EmailCheck(email);
            if (check.statusCode == 401) return new ObjectResult(check);

            CustomCodes result = await _tokenService.ForgotPassword(email);
            EmailTemplate newEmail = new EmailTemplate() {
                Email = email,
                Link = "https://localhost:5001/email/" + result.access_token,
                Switch = "forgotPassword"
            };
            await _mailer.SendEmailAsync(newEmail);
            var response = new CustomCodes { statusCode = 200 };
            return new ObjectResult(response);
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
                return new ObjectResult(new CustomCodes { statusCode = 404 } );
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

        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            var result = await _tokenService.ForgotPassword(email);
            EmailTemplate newEmail = new EmailTemplate() {
                Email = email,
                Link = "https://localhost:5001/email/" + result.access_token,
                Switch = "forgotPassword"
            };
            await _mailer.SendEmailAsync(newEmail);
            var response = new CustomCodes { statusCode = 200 };
            return new ObjectResult(response);
        }
    }
}