import { FC } from "react";
import { ICommentLikeEvent, IEvent, IMomentLikeEvent, ISubscriptionEvent } from "../../utils/interfaces/eventsInterfaces";
import UserAvatar from "../ReusableComponents/UserAvatar";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../utils/consts/routeConsts";
import './Event.scss'
import moment from "moment";
import 'moment/locale/ru'

const Event: FC<{ event: IEvent }> = ({ event }) => {
    let myEvent: ICommentLikeEvent | IMomentLikeEvent | ISubscriptionEvent
    let eventText: string = ''
    let eventLink: JSX.Element = <></>
    moment.locale('ru')
    const time = moment(event.creation_date).fromNow()

    if (event.event_type === 'like/moment') {
        myEvent = event as IMomentLikeEvent
        eventText = `оценил(-а) ваш момент #${myEvent.moment.id}` 
    } else if (event.event_type === 'like/comment') {
        myEvent = event as ICommentLikeEvent
        eventText = `оценил(-а) ваш комментарий #${myEvent.comment.id}`
    } else if (event.event_type === 'subscription') {
        myEvent = event as ISubscriptionEvent
        eventText = 'подписался(-ась) на вас!'
    } else {
        eventText = ''
    }

    return (
        <div className="event">
            <div className="event-body">
                <UserAvatar avatar={event.author.avatar} />
                <div className="event-info">
                    <Link to={`${RoutePaths.PROFILE_ROUTE}/${event.author.id}`}>
                        {event.author.user.username}
                    </Link> 
                    <br/>
                    {` ${eventText} `} {eventLink} 
                </div>
            </div>
            <div className="event-time">
                {time}
            </div>
        </div>
    )
}

export default Event