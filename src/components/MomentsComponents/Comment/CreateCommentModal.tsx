import { Dispatch, FC, useState } from "react";
import { Modal, FloatingLabel, Button, Form } from "react-bootstrap";
import { addComment } from "../../../store/slises/momentsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import moment from "moment";
import { selectCurrentUser } from "../../../store/slises/authorizationSlice";

interface props {
    showNewCommentForm: boolean, 
    setShowNewCommentForm: Dispatch<React.SetStateAction<boolean>>,
    moment_id: number
}

const CreateCommentModal: FC<props> = ({showNewCommentForm, setShowNewCommentForm, moment_id}) => {
    const [commentContent, setCommentContent] = useState('')
    const currentUser = useAppSelector(selectCurrentUser)
    const dispatch = useAppDispatch()

    
    const handleCommentContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCommentContent(e.target.value)
    }

    const handleCommentSave:React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (commentContent && currentUser) {
            dispatch(addComment({content: commentContent, author: currentUser, moment_id}))
        }
        setShowNewCommentForm(false)
    }

    const handleCommentModalClose = () => setShowNewCommentForm(false)

    return (
        <Modal show={showNewCommentForm} onHide={handleCommentModalClose} centered>
                <Modal.Header closeButton>
                    <h5>Оставьте комментарий</h5>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FloatingLabel label='Ваш комментарий'>
                            <Form.Control type='textarea' placeholder="Ваш комментарий" onChange={handleCommentContentChange} autoFocus />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                {commentContent &&
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCommentSave}>
                        Отправить
                    </Button>
                </Modal.Footer>}
            </Modal>
    )
}

export default CreateCommentModal