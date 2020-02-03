export const fetchByRegion = async (params) => {
    const { state, city, study } = params;

    const result = await fetch(`api/book/state=${state}&city=${city}&study=${study}`);
    const json = await result.json();

    console.log(json);
    return { list: json, loaded: true };
};

export const fetchByBook = async (params) => {
    const { title, state, city } = params;

    const result = await fetch(`api/book/title=${title}&state=${state}&city=${city}`);
    const json = await result.json();

    return { list: json, loaded: true };
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
