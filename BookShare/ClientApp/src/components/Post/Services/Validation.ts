import { IBook } from '../../../components/Post/Services/interfaces';

export interface IValid {
    error : boolean;
    message : string;
};

export default (step : number, book : IBook) : IValid => {
    let isValid : IValid = { error: false, message: "" };
    switch (step) {
        case 0:
            isValid = BookIntroCheck(book, isValid);
            return isValid
        case 1:
            isValid = BookInfoCheck(book, isValid);
            return isValid;
        case 2:
            isValid = BookOutroCheck(book, isValid);
            return isValid;
        default:
            return isValid;
    }
};

const BookIntroCheck = (book : IBook, isValid : IValid) : IValid => {
    if (book.image.value.length < 1) {
        return {
            error: true,
            message: "Image of book is required"
        };
    }
    else if (book.title.value.length < 2) {
        return {
            error: true,
            message: "Book title must be longer than 2 letters"
        };
    }
    else return isValid;
};

const BookInfoCheck = (book : IBook, isValid : IValid) : IValid => {
    if (!book.state.value) {
        return {
            error: true,
            message: "Please provide a state the book is in"
        };
    }
    else if (!book.city.value) {
        return {
            error: true,
            message: "Please provide a city the book is in"
        };
    }
    else if (!book.study.value) {
        return {
            error: true,
            message: "Please provide a study the book covers"
        };
    }
    else return isValid;
};

const BookOutroCheck = (book : IBook, isValid : IValid) : IValid => isValid;