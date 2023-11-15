import { IMoment } from "../momentsInterfaces";

export interface MomentsState {
    moments: IMoment[],
    currentPage: number,
    status: 'idle' | 'loading' | 'failed'
}
