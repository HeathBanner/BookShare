using System;
using System.Collections.Generic;
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
        [Route("getById/id={id}")]
        public async Task<IActionResult> GetById(string id)
        {
            CustomCodes result = await _bookService.GetById(id);
            return new ObjectResult(result);
        }

        [Route("id={id}")]
        public async Task<IActionResult> Get(string id)
        {
            CustomCodes result = await _bookService.GetBooks(id);
            return new ObjectResult(result);
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
        [Route("postBook")]
        public IActionResult Books([FromBody] Region book)
        {
            var response = _bookService.Books(book);
            return StatusCode(201, response);
        }

        [Route("editBook")]
        public async Task<IActionResult> EditBook([FromBody] Region book)
        {
            var result = await _bookService.EditBook(book);
            return new ObjectResult(result);
        }

        [Route("fetchBooks/page={page}&sale={sale}&trade={trade}")]
        public async Task<IActionResult> GetBooks([FromBody] Region book, int page, string sale, string trade)
        {
            var result = await _bookService.GetBooks(book, page, sale, trade);
            return new ObjectResult(result);
        }

        [Route("fetchByList/page={page}&sale={sale}&trade={trade}")]
        public async Task<IActionResult> FetchByList([FromBody] Region book, int page, string sale, string trade)
        {
            var result = await _bookService.FetchByList(book, page, sale, trade);
            return new ObjectResult(result);
        }
    }
}
