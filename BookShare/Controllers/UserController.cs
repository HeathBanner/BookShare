using System;
using System.Net.Http;
using System.Threading.Tasks;
using BookShare.Models;
using BookShare.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("id={id}")]
        public IActionResult Get(string id)
        {
            var result = _userService.GetUser(id);

            if (result == null) return  StatusCode(404, new CustomCodes {
                user = null,
                statusCode = 200
            });

            return  StatusCode(200, new CustomCodes {
                user = result,
                statusCode = 200
            });
        }

        [HttpPost]
        [Route("register")]
        public HttpResponseMessage Create([FromBody] Users user)
        {
            var response = _userService.Register(user);
            return response;
        }

        [Route("login")]
        public IActionResult Login([FromBody] Users user)
        {
            var response = _userService.Login(user);

            if (response.Count == 0) return StatusCode(404, new CustomCodes {
                user = null,
                statusCode = 404
            });
            if (response[0].Password != user.Password) return StatusCode(401, new CustomCodes {
                user = null,
                statusCode = 401
            });

            return StatusCode(200, new CustomCodes {
                user = response[0],
                statusCode = 200
            });
        }

        [Route("validatePassword")]
        public async Task<IActionResult> Password([FromBody] Users user)
        {
            var result = await _userService.ValidatePassword(user);

            return new ObjectResult(result);
        }

        [HttpDelete]
        [Route("id={id}&username={username}")]
        public IActionResult BookDelete(string id, string username)
        {
            var result = _userService.DeleteBook(id, username);

            if (result.statusCode == 500) return StatusCode(500, new CustomCodes {
                user = null,
                statusCode = 500
            });

            return StatusCode(200, result);
        }
    }
}
