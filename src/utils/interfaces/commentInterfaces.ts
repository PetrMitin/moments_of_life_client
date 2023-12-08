import { IProfile } from "./userInterfaces"

export interface IComment {
    id: number,
    content: string,
    author: IProfile,
    moment_id: number,
    creation_date: string,
    is_liked: boolean
}

export interface ICommentLike {
    id: number,
    comment_id: number,
    author_id: number,
    moment_id: number,
    creation_date: string
}

export interface CommentCreationData {
    content: string,
    author: IProfile,
    moment_id: number
}

export interface CommentLikeCreationData {
    comment: IComment,
    author_id: number,
    moment_id: number
}