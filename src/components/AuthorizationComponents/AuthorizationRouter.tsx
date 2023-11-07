import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { authorizationRoutes } from "../../routes/authorizationRoutes"
import { RoutePaths } from "../../utils/consts/routeConsts"
import './AuthorizationForm.scss'

const AuthorizationRouter: FC = () => {
    return (
        <div className="authorization-router container">
            <Routes>
                {authorizationRoutes.map(({Component, path}) => <Route key={path} path={path} element={<Component />} />)}
                <Route path='*' element={<Navigate to={RoutePaths.LOGIN_ROUTE} />} />
            </Routes>
        </div>
    )
}

export default AuthorizationRouter