import { FC } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../utils/consts/routeConsts";

const NavigateToDefaultUnauthorized: FC = () => {
    return (
        <Navigate to={RoutePaths.LOGIN_ROUTE} />
    )
}

export default NavigateToDefaultUnauthorized