import { IUserReturn } from './InfoServices';
import { INotify } from '../../../store/interfaces';

export const fetchDelete = async (id: string, username: string): Promise<IUserReturn> => {
    const options = { method: "DELETE" };
    const result = await fetch(`/api/user/id=${id}&username=${username}`, options);
    const json = await result.json();

    return {
        notify: {
            ...initNotify,
            success: true,
            message: "Book has been deleted"
        },
        user: json.user
    };
};

export interface IModal {
    open: boolean;
    id: string;
};

export const initModal: IModal = {
    open: false,
    id: ""
};

export const initNotify: INotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};

export interface IViewer {
    open: boolean;
    index: number;
};