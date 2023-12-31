import { FC, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../../store/hooks"
import { registration } from "../../../store/slises/authorizationSlice"
import validators from "../../../utils/validators/validators"

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState<File | null>(null)
    const [password, setPassword] = useState('')
    const [isFormValidated, setIsFormValidated] = useState<boolean>(false)
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

    const validateForm = (): boolean => {
        return !!username && !!avatar && !!password && validators.validateEmail(email) 
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setIsFormValidated(true)
        if (validateForm()) {
            dispatch(registration({ email, username, avatar, password }))
        }
    }

    return (
        <div className="authorization-form registration-form">
            <h1>Регистрация</h1>
            <Form noValidate onSubmit={handleSubmit} validated={isFormValidated}>
                <FloatingLabel label='Email'>
                    <Form.Control 
                        type='email' 
                        placeholder="example123@mail.ru" 
                        onChange={handleEmailChange}
                        required />
                        <Form.Control.Feedback type='invalid'>Введите корректный email!</Form.Control.Feedback>
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
                        placeholder="Пароль"
                        required />
                </FloatingLabel>

                <FloatingLabel label='Фото профиля'>
                    <Form.Control 
                        type='file' 
                        onChange={handleAvatarChange}
                        required />
                </FloatingLabel>

                <Button type='submit'>Зарегистрироваться</Button>
            </Form>
            
            <p>Уже есть аккаунт? <Link to={'/auth/login'}>Войти</Link></p>
        </div>
    )
}

export default RegistrationForm