export const fetchRegister = async (info) => {
    const body = {
        Username: info.Username,
        Email: info.Email,
        Password: info.Password
    };
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch("api/user/register", options);
    const json = await result.json();

    return json;
};

export const fetchLogin = async (info) => {
    const body = {
        Email: info.Email,
        Password: info.Password
    };
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch("api/user/login", options);
    const json = await result.json();

    console.log(json);

    const status = statusHandler(json);

    console.log(status);
    return status;
};

const statusHandler = (status) => {
    switch (status.statusCode) {
        case 404:
            return { error: true, message: "Email or Password was incorrect!" };
        case 403:
            return { error: true, message: "Password was incorrect!" };
        case 200:
            return { success: true, message: "Login was successful!", payload: status.user };
        default:
            return { error: true, message: "Something went wrong :(" };
    }
}

export const initInfo = {
    Username: "",
    Email: "",
    Password: ""
};

export const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};
