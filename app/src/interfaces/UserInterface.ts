export interface IUser {
    id: number | null;
    email: string | null;
    role: string | null;
}

export interface IUserRegistrate {
    email: string | null;
    password: string | null;
}

export interface IUserLogin {
    email: string | null;
    password: string | null;
}