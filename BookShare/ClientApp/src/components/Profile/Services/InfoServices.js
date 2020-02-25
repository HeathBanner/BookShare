
export const fetchValidatePassword = async (props, username) => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            password: props.password,
            username: username
        }),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch("api/user/validatePassword", options);
    const json = await result.json();

    console.log(json);

    return statusHandler(json, props);
};

export const fetchUpdatePassword = async (props, username) => {
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
    const json = await result.json();

    return statusHandler(json, props);
};

export const fetchUpdateEmail = async (props, username) => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            email: props.email,
            username: username
        }),
        headers: { "Content-Type": "application/json" }
    };
    const result = await fetch("api/user/updateEmail", options);
    const json = await result.json();

    console.log(json);

    return statusHandler(json, props);
};

export const fetchUpdateLF = async (list, username) => {
    const options = {
        method: "POST",
        body: JSON.stringify({ lfBooks: list, username: username }),
        headers: { "Content-Type": "application/json" }
    };

    const result = await fetch("api/user/updateLF", options);
    const json = await result.json();

    console.log(json);

    return json.user;
};

export const fetchUpdateLocation = async (location, username) => {
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
    const json = await result.json();

    console.log(json);

    return json.user;
};

const statusHandler = (json, props) => {
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

export const initModalProps = {
    open: false,
    type: "",
    email: "",
    password: "",
    newPassword0: "",
    newPassword1: "",
    activeStep: 0,
    notify: {
        error: false,
        warning: false,
        success: false,
        message: ""
    }
};

export const initLFBooks = {
    open: false,
    value: "",
    list: [],
    openList: true,
    notify: {
        error: false,
        warning: false,
        success: false,
        message: ""
    }
};

export const initLocation = {
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

export const emailSteps = [
    "Verify Password",
    "Change Email",
    "Finished"
];

export const passwordSteps = [
    "Verify Password",
    "Change Password",
    "Finished"
];

export const getStepContent = (step) => {
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

export const buttonInfo = [
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

export const buttonData = (data, store) => {
    switch (data) {
        case "posted":
            return store.posted.length;
        case "email":
            return store.email;
        case "lfBooks":
            return store.lfBooks ? store.lfBooks.length === 0 ? "Click the Edit button to add some!" : genLFBooks(store.lfBooks) : "Click the Edit button to add some!";
        case "location":
            return !store.city && !store.state ? "Set your location for easier searching!" : `${store.city}, ${store.state}`;
        default:
            return "";
    }
};

const genLFBooks = (list) => {
    let newList;
    list.forEach((item, index) => {
        if (!newList) return newList = `${item}, `;
        if (index === list.length - 1) return newList = newList + item;
        newList = newList + `${item}, `;
    });

    return newList;
};