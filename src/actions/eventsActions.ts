import { ICommentLikeEvent, IMomentLikeEvent, ISubscriptionEvent } from "../utils/interfaces/eventsInterfaces";
import { IProfile } from "../utils/interfaces/userInterfaces";
import { mockEvents } from "../utils/mockData";

class EventsActions {
    async getEvents(user: IProfile) {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const {moment_like_events, comment_like_events, subscription_events} = await res.json()
            const events = [
                ...(moment_like_events.map((event: IMomentLikeEvent) => ({...event, event_type: 'like/moment'}))), 
                ...(comment_like_events.map((event: ICommentLikeEvent) => ({...event, event_type: 'like/comment'}))),
                ...(subscription_events.map((event: ISubscriptionEvent) => ({...event, event_type: 'subscription'})))
            ]
            return events
        }
        return []
    }
}

export default new EventsActions()