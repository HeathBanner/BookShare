export default (step, book) => {
    switch (step) {
        case 0:
            return BookIntroCheck(book);
        case 1:
            return BookInfoCheck(book);
        case 2:
            return BookOutroCheck(book);
        default:
            return false;
    }
};

const BookIntroCheck = (book) => {
    if (!book.image.length > 0) return "Image of book is required";
    if (book.title.value.length < 2) return "Book title must be longer than 2 letters";
    else return false;
};

const BookInfoCheck = (book) => {
    if (!book.state.value) return "Please provide a state the book is in";
    if (!book.city.value) return "Please provide a city the book is in";
    if (!book.study.value) return "Please provide a study the book covers";
    else return false;
};

const BookOutroCheck = (book) => false;