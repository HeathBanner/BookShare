export const fetchByRegion = async (params) => {
    const { state, city, study } = params;

    const result = await fetch(`api/book/state=${state}&city=${city}&study=${study}`);
    const json = await result.json();

    console.log(json);
    return { list: json, loaded: true };
};

export const fetchByBook = async (params, lfBooks) => {
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

    console.log(json, page);

    return { list: json.books, loaded: true, page: page };
};

export const fetchByList = async (params) => {
    const { list, state, city, page, sale, trade } = params;
    const parsedList = list.split("&");
    console.log(parsedList);

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

    console.log(json);

    return { list: json.books, loaded: true, page: page };
};

export const genFilter = async (checked, params) => {
    const { title, state, city } = params;
    let link = `api/book/filter/Title=${title}&State=${state}&City=${city}`;

    Object.entries(checked).forEach(([key, value]) => {
        if (!value.on) {
            link = link.concat("&", `${key}=${null}`);
        } else {
            link = link.concat("&", `${key}=${value.value}`);
        }
    });

    const result = await fetch(link);
    const json = await result.json();

    return json;
};

export const initFilter = {
    Study: { on: false, value: "" },
    Condition: { on: false, value: "" },
    ISBN: { on: false, value: "" },
    CourseId: { on: false, value: "" }
};

export const initModal = {
    query: false,
    filter: false
};
