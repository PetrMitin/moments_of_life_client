import Cookies from "js-cookie";
import { CommentCreationData, CommentLikeCreationData, IComment, ICommentLike } from "../utils/interfaces/commentInterfaces";

class CommentsActions {
    async addComment(commentCreationData: CommentCreationData): Promise<IComment | null> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/comments/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: JSON.stringify(commentCreationData),
            credentials: 'include'
        })
        if (res.ok) {
            const comment = await res.json()
            return comment
        }
        return null
    }

    async likeComment(commentLikeCreationData: CommentLikeCreationData): Promise<ICommentLike | null> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/comments/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: JSON.stringify({
                comment_id: commentLikeCreationData.comment.id, 
                author_id: commentLikeCreationData.author_id
            }),
            credentials: 'include'
        })
        if (res.ok) {
            const like = await res.json()
            console.log(like)
            return {
                id: like.id, 
                comment_id: like.comment.id, 
                author_id: like.author.id, 
                creation_date: like.creation_date, 
                moment_id: like.comment.moment.id
            }
        }
        return null
    }

    async unlikeComment(commentLikeCreationData: CommentLikeCreationData): Promise<CommentLikeCreationData | null> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/comments/unlike/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: JSON.stringify({
                comment_id: commentLikeCreationData.comment.id, 
                author_id: commentLikeCreationData.author_id
            }),
            credentials: 'include'
        })
        if (res.ok) {
            const deletionData = await res.json()
            return deletionData.successful ? commentLikeCreationData : null
        }
        return null
    }
}

export default new CommentsActions()