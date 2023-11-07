import LoginForm from "../components/AuthorizationComponents/LoginComponents/LoginForm";
import RegistrationForm from "../components/AuthorizationComponents/RegistrationComponents/RegistrationForm";
import { AuthorizationRoutePaths } from "../utils/consts/routeConsts";
import { IRoute } from "./routeInterfaces";

export const authorizationRoutes: IRoute[] = [
    {
        path: AuthorizationRoutePaths.LOGIN_ROUTE,
        Component: LoginForm
    },
    {
        path: AuthorizationRoutePaths.REGISTRATION_ROUTE,
        Component: RegistrationForm
    }
]