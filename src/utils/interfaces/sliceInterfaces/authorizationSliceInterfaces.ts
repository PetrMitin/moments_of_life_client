import { IUser } from "../userInterfaces"

export interface AuthorizationState {
    currentUser: IUser | null
}

export interface LoginData {
    email: string,
    password: string
}

export interface RegistrationData {
    email: string,
    username: string,
    password: string,
    avatar: File | null,
    registration_date: Date,
}