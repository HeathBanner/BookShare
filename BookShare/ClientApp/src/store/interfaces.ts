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

export interface IUser {
    id : string;
    username : string;
    email : string;
    password : string;
    posted : IPosted[];
    lfbooks : string[];
    city : string;
    state : string;
    link : string;
    passwordRecovery : IPasswordRecovery;
    request : IRequest;
};