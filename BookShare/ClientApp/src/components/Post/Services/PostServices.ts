import { IUser, IPosted } from '../../../store/interfaces';

interface IEditUser {
    notify : INotify;
    user : IUser | null;
};

export interface IBookRaw {
    image : any,
    title : string,
    description : string,
    condition : string,
    price : number,
    lfBooks : string[],
    eMedia : string,
    state : string,
    city : string,
    study : string,
    isbn : string,
    courseId : string,
};

export const fetchPost = async (book : IBook, user : IUser) : Promise<IEditUser> => {
    const newBook = extractValues(book);
    const options = {
        method: 'POST',
        body: JSON.stringify({ ...newBook, Owner: user.username, Email: user.email }),
        headers: { "Content-Type": "application/json" }
    };

    const res = await fetch("api/book/postBook", options);
    const json = await res.json();

    if (json.statusCode !== 201) {
        return {
            notify: { ...initNotify, error: true, message: "Something went wrong :(" },
            user: user
        };
    }

    return {
        notify: { ...initNotify, success: true, message: `Book has been posted. If you wish to edit the book, you may do so in "My Books"` },
        user: json.user
    };
};

export const fetchEdit = async (book : IBook, user : IUser, id : string) : Promise<IEditUser> => {
    const newBook = extractValues(book);
    const options = {
        method: 'POST',
        body: JSON.stringify({ ...newBook, Owner: user.username, Id: id }),
        headers: { "Content-Type": "application/json" }
    };

    const res = await fetch("api/book/editBook", options);
    const json = await res.json();

    if (json.statusCode !== 200) {
        return {
            notify: { ...initNotify, error: true, message: "Something went wrong :(" },
            user: null
        };
    }

    return {
        notify: { ...initNotify, success: true, message: "Book has been posted!" },
        user: json.user
    };
};

export interface IFetchId {
    notify : INotify;
    book : IBook;
};

export const fetchById = async (id : string) : Promise<IFetchId> => {
    const result = await fetch(`api/book/getById/id=${id}`);
    const json = await result.json();

    if (json.statusCode === 404) {
        return {
            notify: {
                ...initNotify,
                error: true,
                message: "Book could not be found"
            },
            book: initBook
        };
    };

    const reObj = assignValue(json.book);
    return { book: reObj, notify: initNotify };
};

interface IValueSwitch {
    [key : string] : IValues;
};

const assignValue = (book : IPosted) : IBook => {
    let newObj : IBook = initBook;
    Object.entries(book).forEach(([key, value]) => {
        if (key === "lfBooks") newObj.lfBooks = value;
        const result : IValueSwitch | null = valueSwitch(key, value);
        if (result) newObj = { ...newObj, ...result };
    });

    return newObj;
};

const valueSwitch = (key : string, value : string) : IValueSwitch | null => {
    switch(key) {
        case "title":
            return { title: { error: false, value: value }};
        case "description":
            return { descrption: { error: false, value: value }};
        case "condition":
            return { condition: { error: false, value: value }};
        case "price":
            return { price: { error: false, value: value }};
        case "eMedia":
            return {eMedia: { error: false, value: value }};
        case "state":
            return {state: { error: false, value: value }};
        case "city":
            return {city: { error: false, value: value }};
        case "study":
            return { study: { error: false, value: value }};
        case "isbn":
            return { isbn: { error: false, value: value }};
        case "courseId":
            return { courseId: { error: false, value: value }};
        default:
            return null;
    }
};

interface IExtractSwitch {
    [key : string] : string;
};


export const initBookRaw : IBookRaw = {
    image: [],
    title: "",
    description: "",
    condition: "",
    price: 0,
    lfBooks: [],
    eMedia: "",
    state: "",
    city: "",
    study: "",
    isbn: "",
    courseId: "",
};

const extractValues = (book : IBook) : IBookRaw => {
    let newObj : IBookRaw = initBookRaw;
    Object.entries(book).forEach(([key, value]) => {
        if (key === "image") newObj.image = value;
        else if (key === "lfBooks") newObj[key] = value;
        else if (key === "price" && isNaN(parseFloat(value.value))) newObj.price = 0;
        else if (key === "price") newObj[key] = parseFloat(value.value);
        else {
            const result : IExtractSwitch | null = extractSwitch(key, value);
            newObj = { ...newObj, ...result };
        }
    });
    return newObj;
};

const extractSwitch = (key : string, value : string) : IExtractSwitch | null => {
    switch(key) {
        case "title":
            return { title: value };
        case "description":
            return { description: value };
        case "condition":
            return { condition: value };
        case "eMedia":
            return { eMedia: value };
        case "state":
            return { state: value };
        case "city":
            return { city: value };
        case "study":
            return { study: value };
        case "isbn":
            return { isbn: value };
        case "courseId":
            return { courseId: value };
        default:
            return null;
    }
};

export const preSubmit = (book : IBook, notify : INotify) : IFetchId => {
    if (parseFloat(book.price.value) === NaN) {
        return {
            notify: { ...notify, warning: true, message: "Study field is required" },
            book: { ...book, study: { ...book.study, error: true } }
        };
    };

    switch (true) {
        case book.image.value.length < 0 || book.image.value.length > 5:
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

export const handleBook = (type : string, param : string, index : number, list : string[]) : string[] => {
    let newList = list;
    let newParam : string;
    if (typeof param !== undefined) newParam = param;
    if (type === "ADD") newList.push(param);
    if (type === "REMOVE") newList.splice(index, 1);

    return newList;
};

interface IValues {
    error : boolean;
    value : string;
};

interface IImage {
    error: boolean;
    value: any[];
};

const initValues : IValues = { error: false, value: "" };

export interface IBook {
    image: IImage,
    title: IValues,
    description: IValues,
    condition: IValues,
    price: IValues,
    lfBooks: string[],
    eMedia: IValues,
    state: IValues,
    city: IValues,
    study: IValues,
    isbn: IValues,
    courseId: IValues,
};

export const initBook : IBook = {
    image: { value: [], error: false },
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

export interface INotify {
    error : boolean;
    success : boolean;
    warning : boolean;
    message: string;
};

export const initNotify : INotify = {
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