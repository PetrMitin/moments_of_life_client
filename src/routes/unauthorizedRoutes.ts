import NavigateToDefaultUnauthorized from "../components/ReusableComponents/NavigateToDefaultUnauthorized";
import Authorization from "../pages/Authorization";
import { RoutePaths } from "../utils/consts/routeConsts";
import { IRoute } from "./routeInterfaces";

export const unauthorizedRoutes: IRoute[] = [
    {
        path: RoutePaths.AUTHORIZATION_ROUTE,
        Component: Authorization
    },
    {
        path: RoutePaths.ALL_PATH,
        Component: NavigateToDefaultUnauthorized
    }
]