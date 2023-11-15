import { FC, useState } from "react";
import { IComment } from "../../../utils/interfaces/commentInterfaces";
import LikeButton from "../../ReusableComponents/Buttons/LikeButton";
import './Comment.scss'
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { likeComment, unlikeComment } from "../../../store/slises/momentsSlice";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../utils/consts/routeConsts";

const Comment: FC<{ comment: IComment }> = ({ comment }) => {
    const currentUser = useAppSelector(state => state.authorization.currentUser)
    const dispatch = useAppDispatch()
    const isLiked = useAppSelector(state => state.moments.moments.find(moment => moment.id === comment.moment_id)?.comments.find(val => val.id === comment.id)?.isLiked || false)

    const handleLikeButtonClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (currentUser)
            dispatch(isLiked 
                    ? unlikeComment({comment, moment_id: comment.moment_id, author_id: currentUser.id})
                    : likeComment({comment, moment_id: comment.moment_id, author_id: currentUser.id}))
    }

    return (
        <div className="comment">
            <div className="comment-content">
                <div className="comment-author">
                    <Link to={`${RoutePaths.PROFILE_ROUTE}/${comment.author.id}`}>{comment.author.user.username}</Link>
                </div>
                <div className="comment-text-content">{comment.content}</div>
            </div>
            <LikeButton isLiked={isLiked} handleLikeButtonClick={handleLikeButtonClick} variant={'comment-custom-button'} />
        </div>
    )
}

export default Comment