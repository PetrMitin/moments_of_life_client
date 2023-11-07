import { IUser } from "./userInterfaces"

export interface IComment {
    id: string,
    content: string,
    author: IUser,
    moment_id: string,
    creation_date: string,
    isLiked: boolean
}

export interface ICommentLike {
    id: string,
    comment_id: string,
    author_id: string,
    moment_id: string,
    creation_date: string
}

export interface CommentCreationData {
    content: string,
    author: IUser,
    moment_id: string
}

export interface CommentLikeCreationData {
    comment: IComment,
    author_id: string,
    moment_id: string
}