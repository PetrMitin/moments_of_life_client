import { Centrifuge } from "centrifuge";
import { IEvent } from "../eventsInterfaces";

export interface EventsState {
    events: IEvent[],
    status: 'idle' | 'loading' | 'failed',
    currentPage: number
}