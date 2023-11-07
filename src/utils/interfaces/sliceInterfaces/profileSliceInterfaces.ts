import { IMoment } from "../momentsInterfaces";
import { IUser } from "../userInterfaces";

export interface ProfileState {
    profileUser: IUser | null,
    userMoments: IMoment[],
    currentPage: number,
    numberOfPages: number,
    status: 'idle' | 'failed' | 'loading',
    isSubscribed: boolean
}