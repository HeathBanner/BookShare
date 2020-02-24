export const fetchPost = async (book, username) => {
    const newBook = ExtractValues(book);
    const options = {
        method: 'POST',
        body: JSON.stringify({ ...newBook, Owner: username }),
        headers: { "Content-Type": "application/json" }
    };

    const res = await fetch("api/book/postBook", options);
    const json = await res.json();

    if (json.statusCode !== 201) {
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

export const fetchEdit = async (book, username, id) => {
    const newBook = ExtractValues(book);
    const options = {
        method: 'POST',
        body: JSON.stringify({ ...newBook, Owner: username, Id: id }),
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

    console.log(json);
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
        if (key === "lfBooks") newObj[key] = value;
        else newObj[key] = value.value;
    });

    return newObj;
};

export const preSubmit = (book, notify) => {
    switch (true) {
        case !book.image.value:
            return {
                notify: { ...notify, warning: true, message: "Image of book is required" },
                book: { ...book, image: { ...book.image, error: true } }
            };
        case !book.title.value:
            return {
                notify: { ...notify, warning: true, message: "Title is required" },
                book: { ...book, title: { ...book.title, error: true } }
            };
        case !book.description.value:
            return {
                notify: { ...notify, warning: true, message: "Description is required" },
                book: { ...book, description: { ...book.description, error: true } }
            };
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
                notify: { warning: false }
            };
    }
};

const initValues = { error: false, value: "" };

export const initBook = {
    image: initValues,
    title: initValues,
    description: initValues,
    condition: initValues,
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
"AL",
"AK",
"AZ",
"AR",
"CA",
"CO",
"CT",
"DE",
"DC",
"FL",
"GA",
"HI",
"ID",
"IL",
"IN",
"IA",
"KS",
"KY",
"LA",
"ME",
"MT",
"NE",
"NV",
"NH",
"NJ",
"NM",
"NY",
"NC",
"ND",
"OH",
"OK",
"OR",
"MD",
"MA",
"MI",
"MN",
"MS",
"MO",
"PA",
"RI",
"SC",
"SD",
"TN",
"TX",
"UT",
"VT",
"VA",
"WA",
"WV",
"WI",
"WY"
];