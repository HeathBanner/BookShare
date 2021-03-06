﻿using System;
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
        private readonly TokenService _tokenService;

        public UserController(UserService userService, TokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
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
        public async Task<IActionResult> Create([FromBody] Users user)
        {
            var result = await _userService.Register(user);
            return new ObjectResult(result);
        }

        [Route("validatePassword")]
        public async Task<IActionResult> Password([FromBody] Users user)
        {
            var result = await _userService.ValidatePassword(user);

            return new ObjectResult(result);
        }

        [Route("updatePassword")]
        public async Task<IActionResult> UpdatePassword([FromBody] Users user)
        {
            var result = await _userService.UpdatePassword(user);
            return new ObjectResult(result);
        }

        [Route("passwordRecovery")]
        public async Task<IActionResult> PasswordRecovery([FromBody] Users user)
        {
            var result = await _userService.PasswordRecovery(user);
            return new ObjectResult(result);
        }

        [Route("updateEmail")]
        public async Task<IActionResult> UpdateEmail([FromBody] Users user)
        {
            if (await _userService.UpdateEmail(user))
            {
                CustomCodes result = await _tokenService.GenerateToken(user.Email);
                return new ObjectResult(result);
            }
            else
            {
                return new ObjectResult(new CustomCodes
                {
                    statusCode = 500
                });
            }
        }

        [Route("updateLF")]
        public async Task<IActionResult> UpdateLF([FromBody] Users user)
        {
            var result = await _userService.UpdateLF(user);
            return new ObjectResult(result);
        }

        [Route("updateLocation")]
        public async Task<IActionResult> updateLocation([FromBody] Users user)
        {
            var result = await _userService.updateLocation(user);

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
