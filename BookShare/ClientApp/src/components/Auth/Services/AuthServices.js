export const fetchRegister = async (body) => {
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch("api/user/register", options);
    const json = await result.json();

    return json;
};

export const fetchLogin = async (body) => {
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch("api/user/login", options);
    const json = await result.json();

    return json;
};