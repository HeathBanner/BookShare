﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BookShare.Models;
using BookShare.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        [Route("Title={Title}&State={State}&City={City}")]
        public ActionResult<List<Region>> Get(string Title, string State, string City)
        {
            List<Region> document;

            _bookService.GetBooks(Title, State, City, out document);

            return document;
        }

        [Route("id={id}")]
        public ActionResult<List<Region>> Get(string id)
        {
            List<Region> document;

            _bookService.GetBooks(id, out document);

            return document;
        }

        [Route("filter/Title={Title}&State={State}&City={City}&Study={Study}&Condition={Condition}&ISBN={ISBN}&CourseId={CourseId}")]
        public ActionResult<List<Region>> Get(string Title, string State, string City, string Study, string Condition, string ISBN, string CourseId)
        {
            List<Region> document;

            Console.WriteLine("\n\n\n {0} \n {1} \n {2} \n {3} \n\n\n",
                Study, Condition, ISBN, CourseId);

            _bookService.BookFilter(Title, State, City, Study, Condition, ISBN, CourseId, out document);

            return document;
        }

        [HttpPost]
        public IActionResult Books([FromBody] Region book)
        {
            var response = _bookService.Books(book);

            return StatusCode(201, response);
        }
    }
}
