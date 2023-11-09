import { FC, useEffect, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RoutePaths } from "../../../utils/consts/routeConsts"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { login, selectCurrentUser, selectIsAuthSuccessful } from "../../../store/slises/authorizationSlice"
import validators from "../../../utils/validators/validators"

const LoginForm: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isFormValidated, setIsFormValidated] = useState<boolean>(false)
    const isAuthSuccessful = useAppSelector(selectIsAuthSuccessful)
    const dispatch = useAppDispatch()

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    }

    const validateForm = (): boolean => {
        console.log('val');
        return password.length > 0 && !!email // validators.validateEmail(email) in prod
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setIsFormValidated(true)
        if (validateForm()) {
            dispatch(login({email, password}))
        }
    }

    return (
        <div className="authorization-form login-form">
           <h1>Вход</h1>
            <Form noValidate onSubmit={handleSubmit} validated={isFormValidated}>
            {!isAuthSuccessful && <div className="auth-error-message">Неверный email или пароль!</div>}
            <Form.Group controlId="password-form-group">
                    <FloatingLabel label='Email'>
                        <Form.Control 
                            type='email' 
                            placeholder="example123@mail.ru" 
                            onChange={handleEmailChange}
                            required />
                            <Form.Control.Feedback type='invalid' style={{color: 'red'}}>Введите корректный email!</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                
                <Form.Group controlId="password-form-group">
                    <FloatingLabel label='Пароль'>
                        <Form.Control 
                            type='password' 
                            onChange={handlePasswordChange}
                            placeholder="Пароль"
                            required />
                    </FloatingLabel>
                </Form.Group>
                <Button type='submit'>Войти</Button>
            </Form>
            
            <p>Нет аккаунта? <Link to={RoutePaths.REGISTRATION_ROUTE}>Зарегистрироваться</Link></p>
        </div>
    )
}

export default LoginForm