import { createStore } from 'redux';
<<<<<<< HEAD
=======
import { fetchProfile } from './Services';
>>>>>>> 070d917f100a4b2faa90e7f357e8165b17d6d95c

const initState = {
    user: "",
    loggedIn: false,
<<<<<<< HEAD
    checking: true
=======
>>>>>>> 070d917f100a4b2faa90e7f357e8165b17d6d95c
};

const auth = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
<<<<<<< HEAD
                ...state,
=======
>>>>>>> 070d917f100a4b2faa90e7f357e8165b17d6d95c
                user: { ...action.payload },
                loggedIn: true
            };
        case "UPDATE":
<<<<<<< HEAD
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
=======
            return { ...state, user: action.payload };
>>>>>>> 070d917f100a4b2faa90e7f357e8165b17d6d95c
        default:
            return state;
    }
};

export const store = createStore(auth, initState);

store.subscribe(() => console.log(store.getState()));
