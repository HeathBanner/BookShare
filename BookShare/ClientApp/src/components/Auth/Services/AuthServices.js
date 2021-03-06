﻿import { User } from '../../../store/interfaces';

const notify = new User().generateEmptyNotify();

export const fetchRegister = async (info) => {
    try {
        const obj = assignValues(info);
        const options = {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" }
        };
    
        const result = await fetch("api/user/register", options);
        const json = await result.json();
    
        const status = statusHandler(json);
        return status;
    } catch (error) {
        return { ...notify, error: true, message: "Something went wrong :(" };
    }
};

export const fetchLogin = async (info) => {
    try {
        const obj = assignValues(info);
        const options = {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" }
        };
    
        const result = await fetch("api/token/generate", options);
        const json = await result.json();
    
        const status = statusHandler(json);
        return status;
    } catch (error) {
        return { ...notify, error: true, message: "Something went wrong :(" };
    }
};

const defaultObj = {
    Username: "",
    Email: "",
    Password: "",
    Posted: [],
    LFBooks: [],
    City: "",
    State: ""
};

const assignValues = (info) => {
    let newObj = defaultObj;
    Object.entries(info).forEach(([key, value]) => {
        if (key === "Visible") return;
        newObj[key] = value;
    });
    return newObj;
};

const statusHandler = (status) => {
    try {
        switch (status.statusCode) {
            case 404:
                return { ...notify, error: true, message: "Email or Password was incorrect!" };
            case 403:
                return { ...notify, error: true, message: "Password was incorrect!" };
            case 401:
                return { ...notify, error: true, message: "Email already exists" };
            case 200:
                localStorage.setItem("token", status.access_token);
                return { ...notify, success: true, message: "Login was successful!", payload: status.user };
            case 201:
                return { ...notify, success: true, message: "Your account has been created!" };
            default:
                return { ...notify, error: true, message: "Something went wrong :(" };
        }
    } catch (error) {
        return { ...notify, error: true, message: "Something went wrong :(" };
    }
};

export const initInfo = {
    Username: "",
    Email: "",
    Password: "",
    Visible: false
};
