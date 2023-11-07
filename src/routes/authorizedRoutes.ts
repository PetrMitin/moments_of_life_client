import NavigateToDefaultAuthorized from "../components/ReusableComponents/NavigateToDefaultAuthorized";
import Events from "../pages/Events";
import MomentCreation from "../pages/MomentCreation";
import Moments from "../pages/Moments";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import { RoutePaths } from "../utils/consts/routeConsts";
import { IRoute } from "./routeInterfaces";

export const authorizedRoutes: IRoute[] = [
    {
        path: RoutePaths.EVENTS_ROUTE,
        Component: Events
    },
    {
        path: RoutePaths.MOMENTS_ROUTE,
        Component: Moments
    },
    {
        path: RoutePaths.MOMENT_CREATION_ROUTE,
        Component: MomentCreation
    },
    {
        path: RoutePaths.PROFILE_PARAM_ROUTE,
        Component: Profile
    },
    {
        path: RoutePaths.SEARCH_ROUTE,
        Component: Search
    },
    {
        path: RoutePaths.ALL_PATH,
        Component: NavigateToDefaultAuthorized
    }
]