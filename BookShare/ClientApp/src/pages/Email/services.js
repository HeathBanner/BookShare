export const passwordTest = (password) => {
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (strongRegex.test(password)) return { icon: "check_outline", color: "success"};
    if (mediumRegex.test(password)) {
        return { icon: "error_outline", color: "warning" };
    }
    return { icon: "error_outline", color: "error" };
};

export const renderHelp = (password1, password2) => {
    if (password1.color !== "success" || password2.color !== "success") {
        return "Password must contain 1 Uppercase, 1 special character, 1 number and be 8 charcters long";
    }
    if (password1.value !== password2.value) {
        return "Passwords do not match";
    }
    else return "";
};

export const handleSave = async (pass) => {
    const info = { password: pass.password1.value, email: pass.email };
    const result = await fetch("api/user/passwordRecovery", {
        method: "POST",
        body: JSON.stringify(info),
        headers: { "Content-Type": "application/json" }
    });
    const json = await result.json();
    if (!json || !json.statusCode === 200) {
        return {
            ...pass,
            notify: {
                ...pass.notify,
                error: true,
                message: "Something went wrong :("
            }
        };
    }
    return {
        ...pass,
        notify: {
            ...pass.notify,
            success: true,
            message: "Your password has been successfully changed!"
        }
    };
};

export const handleEmail = async (email) => {
    const result = await fetch(`/api/token/email=${email.value}`);
    const json = await result.json();
    console.log(json);
    const response = statusCodeCheck(json, email);
    return response;
};

const statusCodeCheck = (json, email) => {
    switch (true) {
        case !json:
            return {
                ...email,
                notification: {
                    ...email.notification,
                    error: true,
                    message: "Something went wrong :("
                }
             };
        case json.statusCode === 401:
            return {
                ...email,
                notification: {
                    ...email.notification,
                    error: true,
                    message: json.message
                }
            };
        case json.statusCode === 200:
            return {
                ...email,
                notification: {
                    ...email.notification,
                    success: true
                }
            };
        default:
            return {
                ...email,
                notification: {
                    ...email.notification,
                    error: true,
                    message: "Something went wrong :("
                }
            };
    }
}