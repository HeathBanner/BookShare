﻿export const fetchRegister = async (info) => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            Username: info.Username,
            Email: info.Email,
            Password: info.Password
        }),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch("api/user/register", options);
    const json = await result.json();

    const status = statusHandler(json);
    return status;
};

export const fetchLogin = async (info) => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            Email: info.Email,
            Password: info.Password
        }),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch("api/token/generate", options);
    const json = await result.json();

    const status = statusHandler(json);
    return status;
};

const statusHandler = (status) => {
    switch (status.statusCode) {
        case 404:
            return { error: true, message: "Email or Password was incorrect!" };
        case 403:
            return { error: true, message: "Password was incorrect!" };
        case 401:
            return { error: true, message: "Email already exists" };
        case 200:
            localStorage.setItem("token", status.access_token);
            return { success: true, message: "Login was successful!", payload: status.user };
        case 201:
            return { sucess: true, message: "Your account has been created!" };
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
