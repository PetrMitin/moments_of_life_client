import { FC, useEffect } from "react";
import { IUser } from "../../utils/interfaces/userInterfaces";
import SearchMomentsResults from "../SearchComponents/SearchMomentsResults";
import '../SearchComponents/SearchResults.scss'
import ProfileControls from "./ProfileControls";
import UserAvatar from "../ReusableComponents/UserAvatar";
import './UserProfile.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserMoments, selectUserMoments } from "../../store/slises/profileSlice";
import SubscriptionControlButton from "./SubscriptionControlButton";

const UserProfile: FC<{ user: IUser, variant: 'owner' | 'guest' }> = ({ user, variant }) => {
    const userMoments = useAppSelector(selectUserMoments)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserMoments(user))
    }, [dispatch])

    return (
        <div className="user-profile">
            <div className="profile-header">
                <UserAvatar avatar={user.avatar} variant='profile-avatar' />
                <div className="profile-username-and-controls">
                    <h1>{user.username}</h1>
                    { variant === 'owner' 
                    ? <ProfileControls /> 
                    : <SubscriptionControlButton /> }
                </div>
            </div>
            <div className="profile-stats">
                <div className="profile-stat">
                    {user.rating}<br/>
                    <span>очков рейтинга</span>
                </div>
                <div className="profile-stat">
                    {user.number_of_moments}<br/>
                    <span>моментов</span>
                </div>
                <div className="profile-stat">
                    {user.number_of_followers}<br/>
                    <span>подписчиков</span>
                </div>
                <div className="profile-stat">
                    {user.number_of_following}<br/>
                    <span>подписок</span>
                </div>
            </div>
            <div className="search-results">
                <SearchMomentsResults moments={userMoments} />
            </div>
        </div>
    )
}

export default UserProfile