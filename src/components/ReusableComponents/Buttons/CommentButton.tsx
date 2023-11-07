import { FC } from "react";
import CommentIcon from "../Icons/CommentIcon";

const CommentButton: FC<{ handleClick: React.MouseEventHandler<HTMLDivElement> }> = ({ handleClick }) => {
    return (
        <div className="custom-button" onClick={handleClick}>
            <CommentIcon />
        </div>
    )
}

export default CommentButton