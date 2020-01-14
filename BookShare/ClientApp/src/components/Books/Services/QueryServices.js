export const fetchByRegion = async (params) => {
    const { state, city, study } = params;

    const result = await fetch(`api/book/state=${state}&city=${city}&study=${study}`);
    const json = await result.json();

    console.log(json);
    return { list: json, loaded: true };
};

export const fetchByBook = async (params) => {
    const { title, study } = params;

    const result = await fetch(`api/book/title=${title}&study=${study}`);
    const json = await result.json();

    return { list: json, loaded: true };
};
