import { createStore } from 'redux';
import { fetchProfile } from './Services';

const initState = {
    user: "",
    loggedIn: false,
};

const auth = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: { ...action.payload },
                loggedIn: true
            };
        case "UPDATE":
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export const store = createStore(auth, initState);

store.subscribe(() => console.log(store.getState()));
