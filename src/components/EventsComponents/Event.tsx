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
    let eventText: string = 'оценил(-а) ваш'
    let eventLink: JSX.Element
    moment.locale('ru')
    const time = moment(event.creation_date).fromNow()

    if (event.event_type === 'like/moment') {
        myEvent = event as IMomentLikeEvent
        eventLink = <Link to={`${RoutePaths.MOMENTS_ROUTE}/${myEvent.moment_id}`}>момент</Link>
    } else if (event.event_type === 'like/comment') {
        myEvent = event as ICommentLikeEvent
        eventText = 'оценил(-а) ваш комментарий к'
        eventLink = <Link to={`${RoutePaths.MOMENTS_ROUTE}/${myEvent.moment_id}`}>моменту</Link>
    } else if (event.event_type === 'subscription') {
        myEvent = event as ISubscriptionEvent
        eventText = 'подписался(-ась) на вас!'
        eventLink = <></>
    } else {
        eventLink = <></>
        eventText = ''
    }

    return (
        <div className="event">
            <div className="event-body">
                <UserAvatar avatar={event.emited_by.avatar} />
                <div className="event-info">
                    <Link to={`${RoutePaths.PROFILE_ROUTE}/${event.emited_by.id}`}>
                        {event.emited_by.username}
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