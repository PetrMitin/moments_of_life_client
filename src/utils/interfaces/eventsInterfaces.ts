import { IUser } from "./userInterfaces";

export interface IEvent {
    id: string,
    emited_by: IUser,
    creation_date: string,
    event_type: 'like/moment' | 'like/comment' | 'subscription'
}

export interface IMomentLikeEvent extends IEvent {
    event_type: 'like/moment',
    moment_id: string
}

export interface ICommentLikeEvent extends IEvent {
    event_type: 'like/comment',
    comment_id: string,
    moment_id: string
}

export interface ISubscriptionEvent extends IEvent {
    event_type: 'subscription'
}