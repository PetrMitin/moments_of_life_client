import { CommentCreationData, CommentLikeCreationData, IComment, ICommentLike } from "../utils/interfaces/commentInterfaces";
import { IMoment } from "../utils/interfaces/momentsInterfaces";
import { IUser } from "../utils/interfaces/userInterfaces";

class CommentsActions {
    async addComment(commentCreationData: CommentCreationData): Promise<IComment | null> {
        const { author, moment_id, content } = commentCreationData
        const newComment: IComment = {
            id: Math.random().toString(),
            content,
            author: author,
            moment_id,
            creation_date: (new Date()).toLocaleTimeString(),
            isLiked: false
        }
        return newComment
    }

    async likeComment(commentLikeCreationData: CommentLikeCreationData): Promise<ICommentLike | null> {
        const { comment, author_id } = commentLikeCreationData
        const newCommentLike: ICommentLike = {
            id: Math.random().toString(),
            comment_id: comment.id,
            author_id: author_id,
            moment_id: comment.moment_id,
            creation_date: (new Date()).toLocaleTimeString()
        }
        return newCommentLike
    }

    async unlikeComment(likeData: CommentLikeCreationData): Promise<ICommentLike | null> {
        const { comment, author_id } = likeData
        return {
            id: Math.random().toString(),
            comment_id: comment.id,
            author_id: author_id,
            moment_id: comment.moment_id,
            creation_date: (new Date()).toLocaleTimeString()
        }
    }
}

export default new CommentsActions()