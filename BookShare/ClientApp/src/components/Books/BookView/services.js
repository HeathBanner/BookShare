export const handleRequest = async (user, book) => {
    const obj = {
        Username: user.username,
        Email: user.email,
        Book: book.info,
        LFBooks: user.lfBooks,
        City: user.City,
        State: user.State,
        Phone: ""
    };
    console.log(obj);
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

export const isRequested = (requests, id) => {
    try {
        let result = { flag: false, error: false };
        requests.forEach(request => {
            console.log(request.id === id);
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
        console.log(error);
        return { flag: false, error: true };
    }
};

export const renderCondition = (condition) => {
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

export const bookInit = {
    info: null,
    loaded: false,
    notification: {
        error: false,
        warning: false,
        success: false,
        message: ""
    }
};