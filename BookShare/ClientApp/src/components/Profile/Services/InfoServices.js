
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

    console.log(json);

    return statusHandler(json, props);
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
