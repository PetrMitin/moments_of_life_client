import { FC } from "react";
import { Image } from 'react-bootstrap'
import { IProfile } from "../../utils/interfaces/userInterfaces";
import ProfileFilledIcon from "../ReusableComponents/Icons/ProfileFiiledIcon";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../utils/consts/routeConsts";

const UserSearchResult: FC<{ user: IProfile }> = ({ user }) => {
    return (
        <div className="search-result">
             <Link to={`${RoutePaths.PROFILE_ROUTE}/${user.id}`}>
                <ProfileFilledIcon />
                <Image src={user.avatar} roundedCircle />
            </Link>
        </div>
    )
}

export default UserSearchResult