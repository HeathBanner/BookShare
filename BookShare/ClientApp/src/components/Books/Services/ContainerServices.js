// VALIDATION INITS AND FUNCTIONS
export const initValidation = {
    open: false,
    lfBooks: []
};

export const addBook = (title, list) => {
    let newList = list;
    newList.push(title);

    return newList;
};

export const removeBook = (index, list) => {
    let newList = list;
    newList.splice(index, 1);

    return newList;
};

export const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};