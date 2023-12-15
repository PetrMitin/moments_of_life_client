import {FC, useEffect} from 'react'
import UserProfile from '../components/ProfileComponents/UserProfile'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useParams } from 'react-router-dom'
import { getUserData, selectProfileUser } from '../store/slises/profileSlice'
import { selectCurrentUser } from '../store/slises/authorizationSlice'

const Profile: FC = () => {
    let currentProfileUser = useAppSelector(selectProfileUser)
    const currentAuthUser = useAppSelector(selectCurrentUser)
    const { id } = useParams()
    const dispatch = useAppDispatch()
   
    useEffect(() => {
        const currentId = id ? parseInt(id) : currentAuthUser?.id
        dispatch(getUserData(currentId))
    }, [dispatch, id])

        return currentProfileUser ? (
                <div className="profile-container">
                    <UserProfile 
                        user={currentProfileUser} 
                        variant={parseInt(id || '') === currentAuthUser?.id ? 'owner' : 'guest'} 
                    />
                </div>
        ) : (<h1>Вы не авторизованы!</h1>)
}

export default Profile