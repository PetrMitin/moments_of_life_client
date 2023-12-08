import { IComment } from "./commentInterfaces";
import { IProfile } from "./userInterfaces";

export interface ITag {
    id: number,
    moment_id: number,
    tag: string
}

export interface IMoment {
    id: number,
    title: string,
    content: string,
    author: IProfile,
    creation_date: string,
    image: string
    comments: IComment[],
    tags: ITag[],
    is_liked: boolean
}

export interface MomentCreationData {
    title: string,
    content: string,
    author: IProfile,
    image: File
}

export interface IMomentLike {
    id: number,
    moment_id: number,
    author_id: number,
    creation_date: string
} 

export interface MomentLikeCreationData {
    moment: IMoment,
    author: IProfile
}