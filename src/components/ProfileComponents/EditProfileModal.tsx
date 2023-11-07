import { FC, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import './EditProfileModal.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectCurrentUser } from "../../store/slises/authorizationSlice";
import { updateProfile } from "../../store/slises/profileSlice";

const EditProfileModal: FC<{ show: boolean, onHide: () => void }> = ({ show, onHide }) => {
    const currentUser = useAppSelector(selectCurrentUser)
    const [username, setUsername] = useState(currentUser?.username || '')
    const [email, setEmail] = useState(currentUser?.email || '')
    const [avatar, setAvatar] = useState<File | null>(null)
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setUsername(e.target.value)
    
    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setEmail(e.target.value)

    const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const newAvatar = e.target.files && e.target.files.length ? e.target.files[0] : null    
        setAvatar(newAvatar)    
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setPassword(e.target.value)

    const setDefaultValues = () => {
        setUsername(currentUser?.username || '')
        setEmail(currentUser?.email || '')
        setAvatar(null)
        setPassword('')
    }

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (currentUser) dispatch(updateProfile({id: currentUser.id, username, email, avatar, password}))
        onHide()
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        setDefaultValues()
        onHide()
    }

    const handleLogout = () => dispatch(logout())

    return currentUser ? (
        <Modal show={show} onHide={onHide} centered>
            <Form>
                <Modal.Header closeButton><h3>Редактировать профиль</h3></Modal.Header>
                <Modal.Body>
                        <FloatingLabel label='Новое имя пользователя'>
                            <Form.Control type="text" placeholder="Новое имя пользователя" onChange={handleUsernameChange} defaultValue={username} />
                        </FloatingLabel>
                        <FloatingLabel label='Новый email'>
                            <Form.Control type="email" placeholder="Новый email" onChange={handleEmailChange} defaultValue={email} />
                        </FloatingLabel>
                        <FloatingLabel label='Новый аватар'>
                            <Form.Control type="file" onChange={handleAvatarChange} />
                        </FloatingLabel>
                        <FloatingLabel label='Новый пароль'>
                            <Form.Control type='password' placeholder="Новый пароль" onChange={handlePasswordChange} defaultValue={password} />
                        </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleSubmit}>Сохранить</Button>
                    <Button variant='secondary' onClick={handleCancel}>Отмена</Button>
                    <Button variant='danger' onClick={handleLogout}>Выйти</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    ) : (<h1>Вы не авторизованы!</h1>)
}

export default EditProfileModal