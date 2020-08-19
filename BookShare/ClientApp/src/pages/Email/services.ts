interface IPasswordReturn {
    icon : string;
    color : string;
};

export const passwordTest = (password : string) : IPasswordReturn => {
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (strongRegex.test(password)) {
        return { icon: "check_outline", color: "success"};
    }
    else if (mediumRegex.test(password)) {
        return { icon: "error_outline", color: "warning" };
    }
    else return { icon: "error_outline", color: "error" };
};

interface IPasswordParam {
    color : string;
    value : string;
};

export const renderHelp = (password1 : IPasswordParam, password2 : IPasswordParam) : string => {
    if (password1.color !== "success" || password2.color !== "success") {
        return "Password must contain 1 Uppercase, 1 special character, 1 number and be 8 charcters long";
    }
    else if (password1.value !== password2.value) {
        return "Passwords do not match";
    }
    else return "";
};

export interface IPassword {
    value : string;
    visible : boolean;
};

interface INotify {
    error : boolean;
    success : boolean;
    warning : boolean;
    message : string;
};

export interface IPass {
    checked : boolean;
    pass : boolean;
    password1 : IPassword;
    password2 : IPassword;
    email : string;
    notification: INotify;
};

export const handleSave = async (pass : IPass) : Promise<IPass> => {
    const info = { password: pass.password1.value, email: pass.email };
    const result = await fetch("api/user/passwordRecovery", {
        method: "POST",
        body: JSON.stringify(info),
        headers: { "Content-Type": "application/json" }
    });
    const json = await result.json();
    if (!json) {
        return {
            ...pass,
            notification: {
                ...pass.notification,
                error: true,
                message: "Something went wrong :("
            }
        };
    }
    return {
        ...pass,
        notification: {
            ...pass.notification,
            success: true,
            message: "Your password has been successfully changed!"
        }
    };
};

export interface IEmail {
    value : string;
    valid : boolean;
    notification : INotify;
};

export const handleEmail = async (email : IEmail) : Promise<IEmail> => {
    const result = await fetch(`/api/token/email=${email.value}`);
    const json = await result.json();
    const response : IEmail = statusCodeCheck(json, email);
    return response;
};

const statusCodeCheck = (json : any, email : IEmail) : IEmail => {
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