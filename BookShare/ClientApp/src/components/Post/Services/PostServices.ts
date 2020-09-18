import { IUser, IPosted } from '../../../store/interfaces';
import * as interfaces from './interfaces';

// Add Instance of vertifications to API calls
export class PostServices {

    private initValues: interfaces.IValues = { error: false, value: "" };
    public initBookRaw: interfaces.IBookRaw = {
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
        courseId: ""
    };
    public initBook: interfaces.IBook = {
        image: { value: [], error: false },
        title: this.initValues,
        description: this.initValues,
        condition: this.initValues,
        price: this.initValues,
        lfBooks: [],
        eMedia: this.initValues,
        state: this.initValues,
        city: this.initValues,
        study: this.initValues,
        isbn: this.initValues,
        courseId: this.initValues,
    };
    public initNotify: interfaces.INotify = {
        error: false,
        success: false,
        warning: false,
        message: ""
    };
    
    public assignValue = (book: IPosted): interfaces.IBook => {
        let newObj: interfaces.IBook = this.initBook;
        Object.entries(book).forEach(([key, value]) => {
            if (key === "lfBooks") newObj.lfBooks = value;
            const result: interfaces.IValueSwitch | null = this.valueSwitch(key, value);
            if (result) newObj = { ...newObj, ...result };
        });
    
        return newObj;
    };

    public valueSwitch = (key: string, value: string): interfaces.IValueSwitch | null => {
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
                return { eMedia: { error: false, value: value }};
            case "state":
                return { state: { error: false, value: value }};
            case "city":
                return { city: { error: false, value: value }};
            case "study":
                return { study: { error: false, value: value }};
            case "isbn":
                return { isbn: { error: false, value: value }};
            case "courseId":
                return { courseId: { error: false, value: value }};
            case "image":
                return { image: { error: false, value: value }};
            default:
                return null;
        }
    };

    public extractValues = (book: interfaces.IBook): interfaces.IBookRaw => {
        let newObj: interfaces.IBookRaw = this.initBookRaw;
        Object.entries(book).forEach(([key, value]) => {
            if (key === "image") {
                newObj.image = value.value;
            }
            else if (key === "lfBooks") newObj[key] = value;
            else if (key === "price" && isNaN(parseFloat(value.value))) newObj.price = 0;
            else if (key === "price") newObj[key] = parseFloat(value.value);
            else {
                const result: interfaces.IExtractSwitch | null = this.extractSwitch(key, value.value);
                newObj = { ...newObj, ...result };
            }
        });
        return newObj;
    };

    public extractSwitch = (key: string, value: string): interfaces.IExtractSwitch | null => {
        console.log(value)
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
};

export const preSubmit = (book: interfaces.IBook, notify: interfaces.INotify): interfaces.IFetchId => {
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

export const handleBook = (type: string, param: string, index: number, list: string[]): string[] => {
    let newList = list;
    let newParam : string;
    if (typeof param !== undefined) newParam = param;
    if (type === "ADD") newList.push(param);
    if (type === "REMOVE") newList.splice(index, 1);

    return newList;
};

export const fetchById = async (id: string): Promise<interfaces.IFetchId> => {
    const services = new PostServices();
    const result = await fetch(`api/book/getById/id=${id}`);
    const json = await result.json();

    if (json.statusCode === 404) {
        return {
            notify: {
                ...services.initNotify,
                error: true,
                message: "Book could not be found"
            },
            book: services.initBook
        };
    };

    const reObj = services.assignValue(json.book);
    return { book: reObj, notify: services.initNotify };
};

export const fetchEdit = async (book: interfaces.IBook, user: IUser, id: string): Promise<interfaces.IEditUser> => {
    const services = new PostServices();
    const newBook = services.extractValues(book);
    const options = {
        method: 'POST',
        body: JSON.stringify({ ...newBook, Owner: user.username, Id: id }),
        headers: { "Content-Type": "application/json" }
    };

    const res = await fetch("api/book/editBook", options);
    const json = await res.json();

    if (json.statusCode !== 200) {
        return {
            notify: { ...services.initNotify, error: true, message: "Something went wrong :(" },
            user: null
        };
    }

    return {
        notify: { ...services.initNotify, success: true, message: "Book has been posted!" },
        user: json.user
    };
};

export const fetchPost = async (book: interfaces.IBook, user: IUser): Promise<interfaces.IEditUser> => {
    const services = new PostServices();
    const newBook = services.extractValues(book);
    const options = {
        method: 'POST',
        body: JSON.stringify({
            ...newBook,
            Owner: user.username,
            Email: user.email
        }),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch("api/book/postBook", options);
    const json = await result.json();
    console.log(json);
    if (json.statusCode !== 201) {
        return {
            notify: { ...services.initNotify, error: true, message: "Something went wrong :(" },
            user: user
        };
    }

    return {
        notify: { ...services.initNotify, success: true, message: `Book has been posted. If you wish to edit the book, you may do so in "My Books"` },
        user: json.user
    };
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