import { FC, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../../store/hooks"
import { registration } from "../../../store/slises/authorizationSlice"

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState<File | null>(null)
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value)
    }

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUsername(e.target.value)
    }

    const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files && e.target.files.length ? e.target.files[0] : null
        setAvatar(file)
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        dispatch(registration({email, username, avatar, password, registration_date: new Date()}))
    }

    return (
        <div className="authorization-form registration-form">
            <h1>Регистрация</h1>
            <Form noValidate onSubmit={handleSubmit}>
                <FloatingLabel label='Email'>
                    <Form.Control 
                        type='email' 
                        placeholder="example123@mail.ru" 
                        onChange={handleEmailChange}
                        required />
                </FloatingLabel>

                <FloatingLabel label='Никнейм'>
                    <Form.Control 
                        placeholder="Имя пользователя" 
                        onChange={handleUsernameChange}
                        required />
                </FloatingLabel>

                <FloatingLabel label='Пароль'>
                    <Form.Control 
                        type='password' 
                        onChange={handlePasswordChange}
                        placeholder="Пароль" />
                </FloatingLabel>

                <FloatingLabel label='Фото профиля'>
                    <Form.Control 
                        type='file' 
                        onChange={handleAvatarChange} />
                </FloatingLabel>

                <Button type='submit'>Зарегистрироваться</Button>
            </Form>
            
            <p>Уже есть аккаунт? <Link to={'/auth/login'}>Войти</Link></p>
        </div>
    )
}

export default RegistrationForm