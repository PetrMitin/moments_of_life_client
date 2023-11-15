import { IMoment } from "../momentsInterfaces"
import { IProfile } from "../userInterfaces"

export interface ISearchResults {
    users: IProfile[],
    moments: IMoment[]
}

export interface SearchState {
    moments: IMoment[],
    users: IProfile[],
    status: 'loading' | 'idle' | 'error'
}