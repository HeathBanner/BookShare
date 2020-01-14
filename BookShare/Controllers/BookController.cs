using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BookShare.Models;
using BookShare.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        [Route("state={state}&city={city}&study={study}")]
        public ActionResult<List<Region>> Get(string state, string city, string study)
        {
            Console.WriteLine("\n\n\n {0} {1} {2}", state, city, study);

            List<Region> document;

            _bookService.GetBooks(state, city, study, out document);

            return document;
        }

        [Route("title={title}&study={study}")]
        public ActionResult<List<Region>> Get(string title, string study)
        {
            List<Region> document;

            _bookService.GetBooks(title, study, out document);

            return document;
        }

        [Route("id={id}")]
        public ActionResult<List<Region>> Get(string id)
        {
            List<Region> document;

            _bookService.GetBooks(id, out document);

            return document;
        }

        [HttpPost]
        public HttpResponseMessage Books([FromBody] Region book)
        {
            var response = _bookService.Books(book);

            return response;
        }

        
    }
}
