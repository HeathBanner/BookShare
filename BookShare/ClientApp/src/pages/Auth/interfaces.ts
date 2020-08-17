import { RouteComponentProps } from 'react-router-dom';
import { History, LocationState } from 'history';

export interface IProps extends RouteComponentProps {
    auth : boolean,
    handleClose : () => void;
    history: History<LocationState>;
    dispatch: any;
    classes: any
};

export interface IInfo {
    Username : string;
    Email : string;
    Password: string;
    Visible : boolean;
};

export interface IState {
    mode : number;
    info : IInfo;
};

export interface IRecovery {
    Active : boolean,
    LastActive : string,
    Link : string
};

export interface IRequests {
    Id : string,
    DateRequested : string
};

export interface IUser {
    Id : string,
    Username : string,
    Email : string,
    Password : string,
    Posted : any[],
    LFBooks : string[],
    City : string,
    State : string,
    Link? : string,
    Recovery : IRecovery,
    Requests : IRequests[]
};

export interface INotify {
    error? : boolean,
    success? : boolean,
    warning? : boolean,
    message? : string,
    payload? : IUser
};