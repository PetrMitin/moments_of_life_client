import {FC, useEffect} from 'react'
import UserProfile from '../components/ProfileComponents/UserProfile'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectCurrentUser } from '../store/slises/authorizationSlice'
import { useParams } from 'react-router-dom'
import profileActions from '../actions/profileActions'
import { getUserData, selectProfileUser } from '../store/slises/profileSlice'

const Profile: FC = () => {
    let currentUser = useAppSelector(selectProfileUser)
    const { id } = useParams()
    const dispatch = useAppDispatch()
   
    useEffect(() => {
        dispatch(getUserData(id))
    }, [dispatch])

        return currentUser ? (
                <div className="profile-container">
                    <UserProfile user={currentUser} variant={id ? 'guest' : 'owner'} />
                </div>
        ) : (<h1>Вы не авторизованы!</h1>)
}

export default Profile