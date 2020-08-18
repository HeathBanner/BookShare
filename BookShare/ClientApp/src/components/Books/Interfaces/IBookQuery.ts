import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';

export const initBook = {
    lfBooks: [],
    trash: [],
    Title: "",
    State: "",
    City: "",
    Sale: true,
    Trade: true,
    Imported: false
};
export const initNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export interface IValidation {
    open : boolean;
    lfBooks : string[];
};

export interface IProps extends RouteComponentProps {
    history : History<LocationState>;
    toggleValidation : () => void;
    changeTab : (value : number) => (event : React.MouseEvent<HTMLButtonElement>) => void;
    store : any;
    dispatch : any;
    validation : IValidation;
    handleBooks : (type : string, param : string, index : number) => Promise<void>;
    handleSave : () => Promise<void>;
    classes : any;
};

export interface IManualProps extends RouteComponentProps {
    history : History<LocationState>;
    store : any;
    dispatch : any;
    classes : any;
};

interface IBook {
    lfBooks : string[];
    trash : string[];
    Title : string;
    State : string;
    City : string;
    Sale : boolean;
    Trade : boolean;
    Imported : boolean;
};

interface INotify {
    error : boolean;
    success : boolean;
    warning : boolean;
    message : string;
};

export interface IState {
    book : IBook;
    notify : INotify;
};