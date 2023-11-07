import { FC } from "react";
import { IComment } from "../../../utils/interfaces/commentInterfaces";
import Comment from "./Comment";
import './CommentsList.scss'

const CommentsList: FC<{ comments: IComment[] }> = ({ comments }) => {
    return (
        <div className="comments-list overflow-auto">
            {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        </div>
    )
}

export default CommentsList