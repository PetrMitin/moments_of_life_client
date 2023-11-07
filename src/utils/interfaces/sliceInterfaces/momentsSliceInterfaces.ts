import { IMoment } from "../momentsInterfaces";

export interface MomentsState {
    moments: IMoment[],
    numberOfPages: number,
    currentPage: number,
    status: 'idle' | 'loading' | 'failed'
}
