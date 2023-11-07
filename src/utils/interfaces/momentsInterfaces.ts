import { IComment } from "./commentInterfaces";
import { IUser } from "./userInterfaces";

export interface ITag {
    id: string,
    moment_id: string,
    tag: string
}

export interface IMoment {
    id: string,
    title: string,
    content: string,
    author: IUser,
    creation_date: string,
    image: string
    comments: IComment[],
    tags: ITag[],
    isLiked: boolean
}

export interface MomentCreationData {
    title: string,
    content: string,
    author: IUser,
    image: File
}

export interface IMomentLike {
    id: string,
    moment_id: string,
    author_id: string,
    creation_date: string
} 

export interface MomentLikeCreationData {
    moment: IMoment,
    author: IUser
}