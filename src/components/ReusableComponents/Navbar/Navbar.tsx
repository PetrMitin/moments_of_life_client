import { FC } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Navbar.scss'
import Logo from "../Icons/Logo";
import SearchIcon from "../Icons/SearchIcon";
import HeartIcon from "../Icons/HeartIcon";
import ProfileIcon from "../Icons/ProfileIcon";
import { RoutePaths } from "../../../utils/consts/routeConsts";

const TopNavbar: FC = () => {
    return (
        <Navbar sticky='top'>
            <Link to={RoutePaths.MOMENTS_ROUTE} className="nav-link">
                <Logo />
            </Link>
            <Nav> 
                <Link to={RoutePaths.SEARCH_ROUTE} className="nav-link">
                    <SearchIcon />
                </Link>
                <Link to={RoutePaths.EVENTS_ROUTE} className="nav-link">
                    <HeartIcon />
                </Link>
                <Link to={RoutePaths.PROFILE_ROUTE} className="nav-link">
                    <ProfileIcon />
                </Link>
            </Nav>
        </Navbar>
    )
}

export default TopNavbar