import { CommentCreationData, CommentLikeCreationData, IComment, ICommentLike } from "../utils/interfaces/commentInterfaces";
import { IMoment } from "../utils/interfaces/momentsInterfaces";
import { IProfile } from "../utils/interfaces/userInterfaces";

class CommentsActions {
    async addComment(commentCreationData: CommentCreationData): Promise<IComment | null> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/comments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentCreationData)
        })
        if (res.ok) {
            const comment = await res.json()
            return comment
        }
        return null
    }

    async likeComment(commentLikeCreationData: CommentLikeCreationData): Promise<ICommentLike | null> {
        const { comment, author_id } = commentLikeCreationData
        const newCommentLike: ICommentLike = {
            id: Math.random(),
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
            id: Math.random(),
            comment_id: comment.id,
            author_id: author_id,
            moment_id: comment.moment_id,
            creation_date: (new Date()).toLocaleTimeString()
        }
    }
}

export default new CommentsActions()