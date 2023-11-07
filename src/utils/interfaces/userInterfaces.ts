export interface IUser {
    id: string,
    email: string,
    username: string,
    password: string,
    avatar: string,
    registration_date: string,
    rating: number,
    number_of_moments: number,
    number_of_followers: number,
    number_of_following: number
}

export interface UserUpdateData {
    id: string,
    email: string,
    username: string,
    password: string,
    avatar: File | null
}