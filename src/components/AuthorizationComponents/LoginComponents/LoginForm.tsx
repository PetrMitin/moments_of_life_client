import { FC, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RoutePaths } from "../../../utils/consts/routeConsts"
import { useAppDispatch } from "../../../store/hooks"
import { login } from "../../../store/slises/authorizationSlice"

const LoginForm: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        dispatch(login({email, password}))
    }

    return (
        <div className=" authorization-form login-form">
           <h1>Вход</h1>
            <Form noValidate onSubmit={handleSubmit}>
                <FloatingLabel label='Email'>
                    <Form.Control 
                        type='email' 
                        placeholder="example123@mail.ru" 
                        onChange={handleEmailChange}
                        required />
                </FloatingLabel>
                
            <FloatingLabel label='Пароль'>
                    <Form.Control 
                        type='password' 
                        onChange={handlePasswordChange}
                        placeholder="Пароль" />
                </FloatingLabel>

                <Button type='submit'>Войти</Button>
            </Form>
            
            <p>Нет аккаунта? <Link to={RoutePaths.REGISTRATION_ROUTE}>Зарегистрироваться</Link></p>
        </div>
    )
}

export default LoginForm