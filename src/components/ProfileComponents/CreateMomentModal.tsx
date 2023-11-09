import { FC, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import './CreateMomentModal.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createMoment } from "../../store/slises/momentsSlice";
import { selectCurrentUser } from "../../store/slises/authorizationSlice";
import { IMoment } from "../../utils/interfaces/momentsInterfaces";

const CreateMomentModal: FC<{ show: boolean, onHide: () => void}> = ({ show, onHide }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [isFormValidated, setIsFormValidated] = useState<boolean>(false)
    const currentUser = useAppSelector(selectCurrentUser)
    const dispatch = useAppDispatch()

    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.target.value)

    const handleContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setContent(e.target.value)

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files && e.target.files.length ? e.target.files[0] : null
        setImage(file) 
    }

    const clearInputs = () => {
        setTitle('')
        setContent('')
        setImage(null)
        setIsFormValidated(false)
    }

    const handleSubmit = () => {
        setIsFormValidated(true)
        if (currentUser && title && content && image) {
            dispatch(createMoment({title, content, author: currentUser, image}))
            clearInputs()
            onHide()
        }
    }

    const handleCancel = () => {
        clearInputs()
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Form validated={isFormValidated} noValidate>
                <Modal.Header closeButton><h3>Новый момент</h3></Modal.Header>
                <Modal.Body>
                    <FloatingLabel label='Заголовок'>
                        <Form.Control type='text' placeholder='Заголовок' onChange={handleTitleChange} value={title} required />
                    </FloatingLabel>
                    <FloatingLabel label='Текст'>
                        <Form.Control as='textarea' placeholder='Текст' rows={3} onChange={handleContentChange} value={content} required />
                    </FloatingLabel>
                    <FloatingLabel label='Фото'>
                        <Form.Control type='file' placeholder='Фото' onChange={handleImageChange} required />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>Создать</Button>
                    <Button variant="secondary" onClick={handleCancel}>Отмена</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateMomentModal