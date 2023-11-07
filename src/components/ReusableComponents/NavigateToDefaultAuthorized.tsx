import { FC } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../utils/consts/routeConsts";

const NavigateToDefaultAuthorized: FC = () => {
    return (
        <Navigate to={RoutePaths.MOMENTS_ROUTE} />
    )
}

export default NavigateToDefaultAuthorized