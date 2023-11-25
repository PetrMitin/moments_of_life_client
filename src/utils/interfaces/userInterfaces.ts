export interface IUser {
    id: number,
    email: string,
    username: string,
    password: string,
}

export interface IProfile {
    id: number,
    avatar: string,
    user: IUser,
    rating: number,
    number_of_moments: number,
    number_of_subscribers: number,
    number_of_subscriptions: number,
    registration_date: string
}

export interface ProfileUpdateData {
    id: number,
    email: string,
    username: string,
    password: string,
    avatar: File | null
}

export const isIProfile = (obj: any) : obj is IProfile => {
    return 'id' in obj && 'user' in obj
}