import { IMoment } from "../momentsInterfaces";
import { IProfile } from "../userInterfaces";

export interface ProfileState {
    profileUser: IProfile | null,
    userMoments: IMoment[],
    currentPage: number,
    status: 'idle' | 'failed' | 'loading',
    isSubscribed: boolean
}