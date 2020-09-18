interface IImage {
    url : any[];
};

export interface IPosted {
    id : string;
    city : string;
    state : string;
    study : string;
    image : IImage;
    title : string;
    description : string;
    condition : string;
    eMedia : string;
    isbn : string;
    courseId : string;
    lfBooks : string[];
    price : number;
    owner : string;
    email : string;
};

interface IPasswordRecovery {
    active : boolean;
    lastActive : string;
    link : string;
};

interface IRequest {
    id : string;
    dateRequested : string;
};

export class User {
    private initPasswordRecovery: IPasswordRecovery = {
        active: false,
        lastActive: "",
        link: ""
    };

    private initRequest: IRequest = {
        id: "",
        dateRequested: ""
    };

    private initUser: IUser = {
        id: "",
        username: "",
        email: "",
        password: "",
        posted: [],
        lfBooks: [],
        city: "",
        state: "",
        link: "",
        passwordRecovery: this.initPasswordRecovery,
        request: this.initRequest
    };

    private initNotify = {
        error: false,
        warning: false,
        success: false,
        message: ""
    };

    private initUserReturn = {
        notify: this.initNotify,
        user: this.initUser
    };

    public generateEmptyUserReturn = () => this.initUserReturn;
    public generateEmptyUser = () => this.initUser;
    public generateEmptyNotify = () => this.initNotify;
};

export interface IUser {
    id : string;
    username : string;
    email : string;
    password : string;
    posted : IPosted[];
    lfBooks : string[];
    city : string;
    state : string;
    link : string;
    passwordRecovery : IPasswordRecovery;
    request : IRequest;
};

export interface INotify {
    error: boolean;
    warning: boolean;
    success: boolean;
    message: string;
};