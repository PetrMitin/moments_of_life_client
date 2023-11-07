import { IMoment } from "../momentsInterfaces"
import { IUser } from "../userInterfaces"

export interface ISearchResults {
    users: IUser[],
    moments: IMoment[]
}

export interface SearchState {
    moments: IMoment[],
    users: IUser[],
    status: 'loading' | 'idle' | 'error'
}