interface IAPI {
    list : any[];
    loaded? : boolean;
    page? : number;
};

export const fetchByRegion = async (params : any) : Promise<IAPI> => {
    const { state, city, study } = params;

    const result = await fetch(`api/book/state=${state}&city=${city}&study=${study}`);
    const json = await result.json();

    return { list: json, loaded: true };
};

export const fetchByBook = async (params : any, lfBooks : string[]) : Promise<IAPI> => {
    const { title, state, city, page, sale, trade } = params;
    const options = {
        method: "POST",
        body: JSON.stringify({
            title: title,
            state: state,
            city: city,
            lfBooks: lfBooks
        }),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch(`api/book/fetchBooks/page=${page}&sale=${sale}&trade=${trade}`, options);
    const json = await result.json();

    return { list: json.books, loaded: true, page: page };
};

export const fetchByList = async (params : any) : Promise<IAPI> => {
    const { list, state, city, page, sale, trade } = params;
    const parsedList : string[] = list.split("&");
    const options = {
        method: "POST",
        body: JSON.stringify({
            state: state,
            city: city,
            lfBooks: parsedList
        }),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch(`api/book/fetchByList/page=${page}&sale=${sale}&trade=${trade}`, options);
    const json = await result.json();

    return { list: json.books, loaded: true, page: page };
};

export const genFilter = async (checked : any[], params : any) : Promise<any> => {
    const { title, state, city } = params;
    let link : string = `api/book/filter/Title=${title}&State=${state}&City=${city}`;

    Object.entries(checked).forEach(([key, value]) => {
        if (!value.on) link = link.concat("&", `${key}=${null}`);
        else link = link.concat("&", `${key}=${value.value}`);
    });

    const result = await fetch(link);
    const json = await result.json();
    return json;
};

interface IOptions {
    on : boolean;
    value : string;
};

interface IFilter {
    Study : IOptions;
    Condition : IOptions;
    ISBN : IOptions;
    CourseId : IOptions;
};

export const initFilter : IFilter = {
    Study: { on: false, value: "" },
    Condition: { on: false, value: "" },
    ISBN: { on: false, value: "" },
    CourseId: { on: false, value: "" }
};

interface IModal {
    query : boolean;
    filter: boolean;
};

export const initModal : IModal = {
    query: false,
    filter: false
};

interface INotify {
    error : boolean;
    warning : boolean;
    success : boolean;
    message : string;  
};

export const initNotify : INotify = {
    error: false,
    warning: false,
    success: false,
    message: ""
};
