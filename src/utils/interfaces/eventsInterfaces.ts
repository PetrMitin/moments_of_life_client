import { IComment } from "./commentInterfaces";
import { IMoment } from "./momentsInterfaces";
import { IProfile } from "./userInterfaces";

export interface IEvent {
    id: number,
    author: IProfile,
    creation_date: string,
    event_type: 'like/moment' | 'like/comment' | 'subscription'
}

export interface IMomentLikeEvent extends IEvent {
    event_type: 'like/moment',
    moment: IMoment
}

export interface ICommentLikeEvent extends IEvent {
    event_type: 'like/comment',
    comment: IComment,
}

export interface ISubscriptionEvent extends IEvent {
    event_type: 'subscription'
}