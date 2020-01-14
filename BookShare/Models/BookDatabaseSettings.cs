using System;

namespace BookShare.Models
{
    public class BookDatabaseSettings : IBookDatabaseSettings
    {
        public string UsersCollectionName { get; set; }
        public string BooksCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IBookDatabaseSettings
    {
        string UsersCollectionName { get; set; }
        string BooksCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
