import { INotify, IUser, IPosted, User } from '../../../store/interfaces';

interface IJson {
    user: IUser;
    book: IPosted;
    books: IPosted[];
    statusCode: number;
    message: string;
    access_token: string;
};

export const fetchValidatePassword = async (props: IModal, username: string): Promise<IModal> => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            password: props.password,
            username: username
        }),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch("api/user/validatePassword", options);
    const json: IJson = await result.json();

    return statusHandler(json, props);
};

export const fetchUpdatePassword = async (props: IModal, username: string): Promise<IModal> => {
    if (props.newPassword0 !== props.newPassword1) {
        return {
            ...props,
            notify: {
                ...props.notify,
                warning: true,
                message: "Passwords do not match"
            }
        };
    }

    const options = {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: props.newPassword0
        }),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch("api/user/updatePassword", options);
    const json: IJson = await result.json();

    return statusHandler(json, props);
};

export const fetchUpdateEmail = async (props: IModal, username: string): Promise<IModal> => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            email: props.email,
            username: username
        }),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch("api/user/updateEmail", options);
    const json: IJson = await result.json();

    return statusHandler(json, props);
};

export const fetchUpdateLF = async (list: string[], username: string): Promise<IUserReturn> => {
    const options = {
        method: "POST",
        body: JSON.stringify({ lfBooks: list, username: username }),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch("api/user/updateLF", options);
    const json: IJson = await result.json();

    const emptyUser = new User().generateEmptyUser();

    if (json.statusCode !== 200) {
        return {
            notify: {
                ...initNotify,
                error: true,
                message: "Something went wrong :("
            },
            user: emptyUser
        };
    }

    return {
        notify: initNotify,
        user: json.user
    };
};

export const fetchUpdateLocation = async (location: ILocation, username: string): Promise<IUserReturn> => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            city: location.city,
            state: location.state
        }),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch("api/user/updateLocation", options);
    const json: IJson = await result.json();
    console.log(json);
    const emptyUser = new User().generateEmptyUser();

    if (json.statusCode !== 200) {
        return {
            notify: {
                ...initNotify,
                error: true,
                message: "Something went wrong :("
            },
            user: emptyUser
        };
    }
    return {
        notify: initNotify,
        user: json.user
    };
};

const statusHandler = (json: IJson, props: IModal): IModal => {
    switch (json.statusCode) {
        case 200:
            return {
                ...props,
                activeStep: props.activeStep + 1,
                notify: props.activeStep === 0 ? { ...props.notify } : { ...props.notify, success: true, message: "Success!" }
            };
        case 401:
            return {
                ...props,
                notify: {
                    ...props.notify,
                    error: true,
                    message: "Incorrect Password"
                }
            };
        default:
            return {
                ...props,
                notify: {
                    ...props.notify,
                    error: true,
                    message: "Something went wrong :("
                }
            };
    }
};

export interface IUserReturn {
    notify: INotify,
    user: IUser
};

export interface IModal {
    open: boolean;
    type: string;
    email: string;
    password: string;
    newPassword0: string;
    newPassword1: string;
    visible: boolean;
    activeStep: number;
    notify: INotify;
};

export const initModalProps: IModal = {
    open: false,
    type: "",
    email: "",
    password: "",
    newPassword0: "",
    newPassword1: "",
    visible: false,
    activeStep: 0,
    notify: {
        error: false,
        warning: false,
        success: false,
        message: ""
    }
};

export const initNotify: INotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

interface ILFBooks {
    open: boolean;
    value: string;
    list: string[];
    openList: boolean;
    loaded: boolean;
    notify: INotify;
};

export const initLFBooks: ILFBooks = {
    open: false,
    value: "",
    list: [],
    openList: true,
    loaded: false,
    notify: {
        error: false,
        warning: false,
        success: false,
        message: ""
    }
};

interface ILocation {
    open: boolean;
    city: string;
    state: string;
    notify: INotify;
};

export const initLocation: ILocation = {
    open: false,
    city: "",
    state: "",
    notify: {
        error: false,
        warning: false,
        success: false,
        message: ""
    }
};

export interface IState {
    modalProps: IModal;
    lfBooks: ILFBooks;
    location: ILocation;
    notify: INotify;
};

export const emailSteps: string[] = [
    "Verify Password",
    "Change Email",
    "Finished"
];

export const passwordSteps: string[] = [
    "Verify Password",
    "Change Password",
    "Finished"
];

export const getEmailContent = (step: number): string => {
    switch (step) {
        case 0:
            return "Verify your password to proceed";
        case 1:
            return "Enter your new email";
        case 2:
            return "You're finished!";
        default:
            return "Unkown step";
    }
};

export const getPasswordContent = (step: number): string => {
    switch (step) {
        case 0:
            return "Verify your password to proceed";
        case 1:
            return "Enter your new password";
        case 2:
            return "You're finished!";
        default:
            return "Unkown step";
    }
};

interface IButton {
    click: boolean;
    icon: string;
    text: string;
    data: string;
};

export const buttonInfo: IButton[] = [
    {
        click: true,
        icon: "edit",
        text: "Email",
        data: "email"
    },
    {
        click: true,
        icon: "edit",
        text: "Password",
        data: "password"
    },
    {
        click: false,
        icon: "open_in_browser",
        text: "Books Posted: ",
        data: "posted"
    },
    {
        click: true,
        icon: "edit",
        text: "Books of Interest",
        data: "lfBooks"
    },
    {
        click: true,
        icon: "edit",
        text: "Location",
        data: "location"
    }
];

export const buttonData = (data: string, user: IUser): string | number => {
    switch (data) {
        case "posted":
            return user.posted.length;
        case "email":
            return user.email;
        case "lfBooks":
            return user.lfBooks ? user.lfBooks.length === 0 ? "Click the Edit button to add some!" : genLFBooks(user.lfBooks) : "Click the Edit button to add some!";
        case "location":
            return !user.city && !user.state ? "Set your location for easier searching!" : `${user.city}, ${user.state}`;
        default:
            return "";
    }
};

const genLFBooks = (list: string[]): string => {
    if (list.length === 1) return list[0];
    let newList: string = "";
    list.forEach((item, index) => {
        if (!newList) return newList = `${item}, `;
        if (index === list.length - 1) return newList = newList + item;
        newList = newList + `${item}, `;
    });

    return newList;
};