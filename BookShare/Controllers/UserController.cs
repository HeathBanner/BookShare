using System;
using System.Net.Http;
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

        [HttpPost]
        [Route("register")]
        public HttpResponseMessage Create([FromBody] Users user)
        {
            var response = _userService.Register(user);
            return response;
        }

        [Route("login")]
        public HttpResponseMessage Login([FromBody] Users user)
        {
            var response = _userService.Login(user);
            return response;
        }
    }
}
