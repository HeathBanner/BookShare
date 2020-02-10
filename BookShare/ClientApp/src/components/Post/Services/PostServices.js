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
        case !book.Image:
            return { ...notify, warning: true, message: "Image of book is required" };
        case !book.Title:
            return { ...notify, warning: true, message: "Title is required" };
        case !book.Description:
            return { ...notify, warning: true, messsage: "Description is required" };
        case !book.Condition:
            return { ...notify, warning: true, message: "Condition is required" };
        case !book.State:
            return { ...notify, warning: true, message: "State field is required" };
        case !book.City:
            return { ...notify, warning: true, message: "City field is required" };
        case !book.Study:
            return { ...notify, warning: true, message: "Study field is required" };
        default:
            return { error: false };
    }
};

export const initBook = {
    Image: "",
    Title: "",
    Description: "",
    Condition: "",
    LFBooks: [],
    EMedia: "",
    State: "",
    City: "",
    Study: "",
    ISBN: "",
    CourseId: ""
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