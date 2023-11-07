import { FC } from "react";
import './LikeButton.scss'
import HeartIcon from "../Icons/HeartIcon";

interface LikeButtonProps { 
    isLiked: boolean, 
    handleLikeButtonClick: React.MouseEventHandler<HTMLDivElement>, 
    variant?: 'moment-custom-button' | 'comment-custom-button'
}

const LikeButton: FC<LikeButtonProps> = ({ isLiked, handleLikeButtonClick, variant }) => {
    return (
        <div className={`custom-button ${variant}`} onClick={handleLikeButtonClick}>
            <HeartIcon fill={isLiked ? 'red' : 'currentColor'} />    
        </div>
    )
}

export default LikeButton