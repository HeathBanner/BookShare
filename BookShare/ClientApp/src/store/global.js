import { createStore } from 'redux';

const initState = {
    user: "",
    loggedIn: false,
    checking: true
};

const auth = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: { ...action.payload },
                loggedIn: true
            };
        case "UPDATE":
            return {
                ...state,
                user: action.payload
            };
        case "VALIDATED":
            return {
                loggedIn: true,
                user: action.payload,
                checking: false
            };
        default:
            return state;
    }
};

export const store = createStore(auth, initState);

store.subscribe(() => console.log(store.getState()));
