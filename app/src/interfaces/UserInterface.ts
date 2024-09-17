export interface IUser {
    id: number | null;
    email: string | null;
    role: string | null;
    username: string | null;
    age: number | null;
}

export interface IUserRegistrate {
    email: string | null;
    password: string | null;
    username: string | null;
    age: number | null;
}

export interface IUserLogin {
    email: string | null;
    password: string | null;
}