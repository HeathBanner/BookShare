import { IUser } from '../../../store/interfaces';

export interface IEditUser {
    notify : INotify;
    user : IUser | null;
};

export interface IImageRaw {
    url : string;
};

export interface IBookRaw {
    image : IImageRaw[],
    title : string,
    description : string,
    condition : string,
    price : number,
    lfBooks : string[],
    eMedia : string,
    state : string,
    city : string,
    study : string,
    isbn : string,
    courseId : string,
};

export interface IFetchId {
    notify : INotify;
    book : IBook;
};

export interface IValueSwitch {
    [key : string] : IValues;
};

export interface IExtractSwitch {
    [key : string] : string;
};

export interface IValues {
    error : boolean;
    value : string;
};

export interface IImage {
    error: boolean;
    value: IImageRaw[];
};

export interface IBook {
    image: IImage,
    title: IValues,
    description: IValues,
    condition: IValues,
    price: IValues,
    lfBooks: string[],
    eMedia: IValues,
    state: IValues,
    city: IValues,
    study: IValues,
    isbn: IValues,
    courseId: IValues,
};

export interface INotify {
    error : boolean;
    success : boolean;
    warning : boolean;
    message: string;
};
