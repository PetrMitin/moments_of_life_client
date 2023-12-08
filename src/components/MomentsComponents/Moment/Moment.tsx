import { FC, useState } from "react"
import { IMoment } from "../../../utils/interfaces/momentsInterfaces"
import { Badge, Button, Card, FloatingLabel, Form, Modal } from "react-bootstrap"
import MomentHeader from "./MomentHeader"
import CommentsList from "../Comment/CommentsList"
import './Moment.scss'
import CommentButton from "../../ReusableComponents/Buttons/CommentButton"
import LikeButton from "../../ReusableComponents/Buttons/LikeButton"
import ShareButton from "../../ReusableComponents/Buttons/ShareButton"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { addComment, likeMoment, unlikeMoment } from "../../../store/slises/momentsSlice"
import { selectCurrentUser } from "../../../store/slises/authorizationSlice"
import CreateCommentModal from "../Comment/CreateCommentModal"

const Moment: FC<{ moment: IMoment }> = ({ moment }) => {
    const [showCopiedBadge, setShowCopiedBadge] = useState(false)
    const [showNewCommentForm, setShowNewCommentForm] = useState(false)
    const [isLiked, setIsLiked] = useState(moment.is_liked)
    const currentUser = useAppSelector(selectCurrentUser)
    const dispatch = useAppDispatch()

    const handleLikeButtonClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (currentUser) {
            if (isLiked) {
                dispatch(unlikeMoment({moment, author: currentUser}))
            } else {
                dispatch(likeMoment({moment, author: currentUser}))
            }
            setIsLiked(prev => !prev)
        }
    }

    const handleCommentButtonClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        setShowNewCommentForm(true)
    }

    const handleShareButtonClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_URL}/profile/${moment.author.id}`)
        setShowCopiedBadge(prev => {
            setTimeout(() => setShowCopiedBadge(false), 2000)
            return true
        })
    }

    return (
        <Card className="moment">
            <Card.Header>
                <MomentHeader author={moment.author} creationDate={moment.creation_date} />
            </Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={moment.image} />
                <Card.Title>{moment.title}</Card.Title>
                <Card.Text>
                    {moment.content}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
            <div className="moment-footer">
                    <LikeButton isLiked={isLiked} handleLikeButtonClick={handleLikeButtonClick} />
                    <CommentButton handleClick={handleCommentButtonClick} />
                    <ShareButton handleClick={handleShareButtonClick} />
                    <Badge bg='secondary' hidden={!showCopiedBadge}>
                        <h6>Ссылка скопирована!</h6>
                    </Badge>
            </div>
            </Card.Footer>
            <CommentsList comments={moment.comments} />
            <CreateCommentModal 
                showNewCommentForm={showNewCommentForm} 
                setShowNewCommentForm={setShowNewCommentForm} 
                moment_id={moment.id} />
        </Card>
    )
}

export default Moment