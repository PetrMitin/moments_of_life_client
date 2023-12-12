import { FC, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { authorizedRoutes } from "../routes/authorizedRoutes";
import { unauthorizedRoutes } from "../routes/unauthorizedRoutes";
import { RoutePaths } from "../utils/consts/routeConsts";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getCSRFToken, selectCurrentUser, setCurrentUser } from "../store/slises/authorizationSlice";
import AuthorizedPage from "../pages/AuthorizedPage";

const AppRouter: FC = () => {
    const currentUser = useAppSelector(selectCurrentUser)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('user') || 'null')))
        dispatch(getCSRFToken())
    }, [dispatch])

    return (
        <div className="app-router container">
            <Routes>
                {!currentUser && unauthorizedRoutes.map(({path, Component}) => <Route key={path} path={path} element={<Component />} />)}
                {currentUser && authorizedRoutes.map(({path, Component}) => <Route key={path} path={path} element={<AuthorizedPage Page={Component} />} />)}
            </Routes>
        </div>
    )
}

export default AppRouter