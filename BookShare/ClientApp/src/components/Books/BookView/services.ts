import { IUser, INotify } from '../../../pages/Auth/interfaces';

interface IBook {
    info : any;
    loaded : boolean;
    notification : INotify;
};

interface IRequest {
    id : string;
    dateRequested : string;
};

export const handleRequest = async (user : IUser, book : IBook) : Promise<IBook> => {
    const obj = {
        Username: user.username,
        Email: user.email,
        Book: book.info,
        LFBooks: user.lfBooks,
        City: user.city,
        State: user.state,
        Phone: ""
    };
    const res = await fetch("api/book/request", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json"}
    });
    const json = await res.json();

    if (!json) return {
        ...book,
        notification: {
            error: true,
            message: "Something went wrong :("
        }
    };
    if (json.statusCode === 401) return {
        ...book,
        notification: {
            error: true,
            message: json.message
        }
    };

    return {
        ...book,
        notification: {
            success: true,
            message: "Book has been requested!"
        }
    };
};

interface IRequestResult {
    flag : boolean;
    date? : string;
    error : boolean;
};

export const isRequested = (requests : IRequest[], id : string) => {
    try {
        let result : IRequestResult = { flag: false, error: false };
        requests.forEach((request) => {
            if (request.id === id) {
                return result = {
                    flag: true,
                    date: request.dateRequested,
                    error: false
                };
            }
        });
        return result;
    } catch (error) {
        return { flag: false, error: true };
    }
};

export const renderCondition = (condition : string) : string => {
    switch (condition) {
        case "Mint":
            return "sentiment_very_satisfied";
        case "Good":
            return "sentiment_satisfied";
        case "Fair":
            return "sentiment_dissatisfied";
        default:
            return "sentiment_very_dissatisfied";
    }
};

export const bookInit : IBook = {
    info: null,
    loaded: false,
    notification: {
        error: false,
        warning: false,
        success: false,
        message: ""
    }
};