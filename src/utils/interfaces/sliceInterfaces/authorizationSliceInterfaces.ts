import { IProfile } from "../userInterfaces"

export interface AuthorizationState {
    currentUser: IProfile | null,
    isAuthSuccessful: boolean
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
}