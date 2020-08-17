// VALIDATION INITS AND FUNCTIONS
interface IInitValidation {
    open : Boolean;
    lfBooks : string[];
};

export const initValidation : IInitValidation = {
    open: false,
    lfBooks: []
};

export const addBook = function(title : string, list : string[]) : string[] {
    let newList = list;
    newList.push(title);

    return newList;
};

export const removeBook = function(index : number, list : string[]) : string[] {
    let newList = list;
    newList.splice(index, 1);

    return newList;
};

interface IInitNotify {
    error : boolean;
    success : boolean;
    warning : boolean;
    message : string;
};

export const initNotify : IInitNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};