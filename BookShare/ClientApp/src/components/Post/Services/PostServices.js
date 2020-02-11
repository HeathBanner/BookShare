export const fetchPost =  async (book, username) => {
    console.log(book);
    const options = {
        method: 'POST',
        body: JSON.stringify({ ...book, Owner: username }),
        headers: { "Content-Type": "application/json" }
    };

    const res = await fetch("api/Book", options);
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

export const preSubmit = (book, notify) => {
    switch (true) {
        case !book.Image.value:
            return {
                notify: { ...notify, warning: true, message: "Image of book is required" },
                book: { ...book, Image: { ...book.Image, error: true } }
            };
        case !book.Title.value:
            return {
                notify: { ...notify, warning: true, message: "Title is required" },
                book: { ...book, Title: { ...book.Title, error: true } }
            };
        case !book.Description.value:
            return {
                notify: { ...notify, warning: true, message: "Description is required" },
                book: { ...book, Description: { ...book.Description, error: true } }
            };
        case !book.Condition.value:
            return {
                notify: { ...notify, warning: true, message: "Condition is required" },
                book: { ...book, Condition: { ...book.Condition, error: true } }
            };
        case !book.State.value:
            return {
                notify: { ...notify, warning: true, message: "State field is required" },
                book: { ...book, State: { ...book.State, error: true } }
            };
        case !book.City.value:
            return {
                notify: { ...notify, warning: true, message: "City field is required" },
                book: { ...book, City: { ...book.City, error: true } }
            };
        case !book.Study.value:
            return {
                notify: { ...notify, warning: true, message: "Study field is required" },
                book: { ...book, Study: { ...book.Study, error: true } }
            };
        default:
            return {
                notify: { warning: false }
            };
    }
};

const initValues = { error: false, value: "" };

export const initBook = {
    Image: initValues,
    Title: initValues,
    Description: initValues,
    Condition: initValues,
    LFBooks: [],
    EMedia: initValues,
    State: initValues,
    City: initValues,
    Study: initValues,
    ISBN: initValues,
    CourseId: initValues,
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