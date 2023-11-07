import { FC } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slises/authorizationSlice";
import { selectIsSubscribed, selectProfileUser, subscribe, unsubscribe } from "../../store/slises/profileSlice";

const SubscriptionControlButton: FC = () => {
    const isSubscribed = useAppSelector(selectIsSubscribed)
    const dispatch = useAppDispatch()

    const handleSubscribe = () => {
        dispatch(subscribe())
    } 

    const handleUnsubscribe = () => {
        dispatch(unsubscribe())
    }
    return (
        <div className="profile-controls">
            <Button variant="light" onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}>
                {isSubscribed ?  'Отписаться' : 'Подписаться'}
            </Button>
        </div>
    )
}

export default SubscriptionControlButton