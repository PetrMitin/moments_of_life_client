import { FC } from "react";
import { Badge, Button } from "react-bootstrap";
import ShareIcon from "../Icons/ShareIcon";

const ShareButton: FC<{ handleClick: React.MouseEventHandler<HTMLDivElement> }> = ({ handleClick }) => {
    return (
        <div className="custom-button" onClick={handleClick}>
            <ShareIcon />
        </div>
    )
}

export default ShareButton