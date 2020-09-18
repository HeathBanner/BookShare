export interface IProps {
    auth: boolean,
    handleClose: () => void;
    handleHistory: () => void;
    dispatch: any;
    classes: any
};

export interface IInfo {
    Username: string;
    Email: string;
    Password: string;
    Visible: boolean;
};

export interface IState {
    mode: number;
    info: IInfo;
};

export interface IRecovery {
    Active: boolean,
    LastActive: string,
    Link: string
};

export interface IRequests {
    Id: string,
    DateRequested: string
};

export interface IUser {
    id: string,
    username: string,
    email: string,
    password: string,
    posted: any[],
    lfBooks: string[],
    city: string,
    state: string,
    link?: string,
    recovery: IRecovery,
    requests: IRequests[]
};

export interface INotify {
    error?: boolean,
    success?: boolean,
    warning?: boolean,
    message?: string,
    payload?: IUser
};