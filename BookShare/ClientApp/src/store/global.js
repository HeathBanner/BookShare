import { createStore } from 'redux';

const initNotify = {
    error: false,
    warning: false,
    success: false,
    message: ""
};

const initState = {
    user: "",
    loggedIn: false,
    checking: true,
    notification: initNotify
};

const auth = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: { ...action.payload },
                loggedIn: true
            };
        case "SIGNOUT":
            localStorage.removeItem("token");
            return {
                ...initState,
                checking: false
            };
        case "UPDATE":
            return {
                ...state,
                user: action.payload
            };
        case "NEW_BOOK":
            return {
                ...state,
                ...action.payload
            };
        case "VALIDATED":
            return {
                ...state,
                loggedIn: true,
                user: action.payload,
                checking: false
            };
        case "EXPIRED":
            return {
                ...state,
                checking: false
            };
        case "RELOG":
            localStorage.removeItem("token");
            return {
                ...state,
                loggedIn: false,
                checking: true,
                user: ""
            };
        case "NO_TOKEN":
            return {
                ...state,
                checking: false
            };
        case "ERROR_NOTIFY":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    error: true,
                    message: action.payload
                }
            };
        case "WARNING_NOTIFY":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    warning: true,
                    message: action.payload
                }
            }
        case "SUCCESS_NOTIFY":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    success: true,
                    message: action.payload
                }
            };
        case "RESET_NOTIFY":
            return {
                ...state,
                notification: initNotify
            }
        default:
            return state;
    }
};

export const store = createStore(auth, initState);

store.subscribe(() => console.log(store.getState()));
