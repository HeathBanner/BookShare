export const fetchPost = async (book, user) => {
    const newBook = ExtractValues(book);
    console.log(newBook);
    const options = {
        method: 'POST',
        body: JSON.stringify({ ...newBook, Owner: user.username, Email: user.email }),
        headers: { "Content-Type": "application/json" }
    };

    const res = await fetch("api/book/postBook", options);
    const json = await res.json();

    if (json.statusCode !== 201) {
        return {
            notify: { error: true, message: "Something went wrong :(" },
            user: user
        };
    }

    return {
        notify: { success: true, message: `Book has been posted. If you wish to edit the book, you may do so in "My Books"` },
        user: json.user
    };
};

export const fetchEdit = async (book, user, id) => {
    const newBook = ExtractValues(book);
    console.log(newBook);
    const options = {
        method: 'POST',
        body: JSON.stringify({ ...newBook, Owner: user.username, Id: id }),
        headers: { "Content-Type": "application/json" }
    };

    const res = await fetch("api/book/editBook", options);
    const json = await res.json();

    if (json.statusCode !== 200) {
        return {
            notify: { error: true, message: "Something went wrong :(" },
            user: null
        };
    }

    return {
        notify: { success: true, message: "Book has been posted!" },
        user: json.user
    };
};

export const fetchById = async (id) => {
    const result = await fetch(`api/book/getById/id=${id}`);
    const json = await result.json();

    if (json.statusCode === 404) return { error: true, message: "Book could not be found" };

    const reObj = assignValue(json.book);
    return { book: reObj };
};

const assignValue = (book) => {
    let newObj = initBook;
    Object.entries(book).forEach(([key, value]) => {
        if (key === "lfBooks") newObj[key] = value;
        else newObj[key] = { error: false, value: value };
    });

    return newObj;
};

const ExtractValues = (book) => {
    let newObj = {};
    Object.entries(book).forEach(([key, value]) => {
        if (key === "image") newObj[key] = value;
        else if (key === "lfBooks") newObj[key] = value;
        else if (key === "price" && isNaN(parseFloat(value.value))) newObj[key] = parseFloat(0);
        else if (key === "price") newObj[key] = parseFloat(value.value);
        else newObj[key] = value.value;
    });
    return newObj;
};

export const preSubmit = (book, notify) => {
    if (parseFloat(book.price.value) === NaN) return {
        notify: { ...notify, warning: true, message: "Study field is required" },
        book: { ...book, study: { ...book.study, error: true } }
    };

    switch (true) {
        case book.image.length < 0 || book.image.length > 5:
            return {
                notify: { ...notify, warning: true, message: "Image of book is required" },
                book: { ...book, image: { ...book.image, error: true } }
            };
        case !book.title.value:
            return {
                notify: { ...notify, warning: true, message: "Title is required" },
                book: { ...book, title: { ...book.title, error: true } }
            };
        // case !book.description.value:
        //     return {
        //         notify: { ...notify, warning: true, message: "Description is required" },
        //         book: { ...book, description: { ...book.description, error: true } }
        //     };
        case !book.condition.value:
            return {
                notify: { ...notify, warning: true, message: "Condition is required" },
                book: { ...book, condition: { ...book.condition, error: true } }
            };
        case !book.state.value:
            return {
                notify: { ...notify, warning: true, message: "State field is required" },
                book: { ...book, state: { ...book.state, error: true } }
            };
        case !book.city.value:
            return {
                notify: { ...notify, warning: true, message: "City field is required" },
                book: { ...book, city: { ...book.city, error: true } }
            };
        case !book.study.value:
            return {
                notify: { ...notify, warning: true, message: "Study field is required" },
                book: { ...book, study: { ...book.study, error: true } }
            };
        default:
            return { 
                notify: { ...notify, warning: false },
                book: book
            };
    };
};

export const handleBook = (type, param, list) => {
    let newList = list;
    if (type === "ADD") newList.push(param);
    if (type === "REMOVE") newList.splice(param, 1);

    return newList;
};

const initValues = { error: false, value: "" };

export const initBook = {
    image: [],
    title: initValues,
    description: initValues,
    condition: initValues,
    price: initValues,
    lfBooks: [],
    eMedia: initValues,
    state: initValues,
    city: initValues,
    study: initValues,
    isbn: initValues,
    courseId: initValues,
};

export const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export const conditions = ["Mint", "Good", "Fair", "Rough"];
export const studies = ["Mathmatics", "History", "Medical", "Computer Science", "Psycology"];
export const states = [
{ title: "AL" },
{ title: "AK" },
{ title: "AZ" },
{ title: "AR" },
{ title: "CA" },
{ title: "CO" },
{ title: "CT" },
{ title: "DE" },
{ title: "DC" },
{ title: "FL" },
{ title: "GA" },
{ title: "HI" },
{ title: "ID" },
{ title: "IL" },
{ title: "IN" },
{ title: "IA" },
{ title: "KS" },
{ title: "KY" },
{ title: "LA" },
{ title: "ME" },
{ title: "MT" },
{ title: "NE" },
{ title: "NV" },
{ title: "NH" },
{ title: "NJ" },
{ title: "NM" },
{ title: "NY" },
{ title: "NC" },
{ title: "ND" },
{ title: "OH" },
{ title: "OK" },
{ title: "OR" },
{ title: "MD" },
{ title: "MA" },
{ title: "MI" },
{ title: "MN" },
{ title: "MS" },
{ title: "MO" },
{ title: "PA" },
{ title: "RI" },
{ title: "SC" },
{ title: "SD" },
{ title: "TN" },
{ title: "TX" },
{ title: "UT" },
{ title: "VT" },
{ title: "VA" },
{ title: "WA" },
{ title: "WV" },
{ title: "WI" },
{ title: "WY" }
];