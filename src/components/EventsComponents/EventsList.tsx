import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { appendToEvents, getCentrifugeTokenAndConnect, getEvents, selectEvents, setCurrentPage, setEvents, unsubscribeToEventsMessages } from "../../store/slises/eventsSlice";
import Event from "./Event";
import './EventsList.scss'
import { useInView } from "react-intersection-observer";
import { Centrifuge } from "centrifuge";
import { selectCurrentUser } from "../../store/slises/authorizationSlice";

const EventsList: FC = () => {
    const events = useAppSelector(selectEvents)
    const dispatch = useAppDispatch()
    const loadingStatus = useAppSelector(state => state.events.status)
    const currentProfile = useAppSelector(selectCurrentUser)
    const centrifuge = new Centrifuge('ws://localhost:8081/connection/websocket')
    const { ref, inView } = useInView({
        threshold: .01
    })

    useEffect(() => {
        dispatch(setCurrentPage(1))
        dispatch(getEvents())

        return function() {
            dispatch(setCurrentPage(1))
            dispatch(setEvents([]))
        }
    }, [dispatch])

    useEffect(() => {
        if (inView && events?.length) {
            dispatch(setCurrentPage())
            dispatch(getEvents())
        }
    }, [inView, dispatch])

    useEffect(() => {
        dispatch(getCentrifugeTokenAndConnect(centrifuge))

        return () => {
            dispatch(unsubscribeToEventsMessages(centrifuge))
        };
    }, [])

    useEffect(() => {
        const sub = centrifuge.newSubscription(`events.${currentProfile?.id}`);

        sub.on('publication', function (ctx) {
            console.log(ctx)
            if (events && ctx.data) {
                let newEvent = ctx.data
                if (newEvent?.moment) {
                    newEvent = {...newEvent, event_type: 'like/moment'}
                } else if (newEvent?.comment) {
                    newEvent = {...newEvent, event_type: 'like/comment'}
                } else if (newEvent?.subscriber) {
                    newEvent = {...newEvent, event_type: 'subscription'}
                }
                dispatch(appendToEvents(newEvent))
            }
        }).on('subscribing', function (ctx) {
            console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);
        }).on('subscribed', function (ctx) {
            console.log('subscribed', ctx);
        }).on('unsubscribed', function (ctx) {
            console.log(`unsubscribed: ${ctx.code}, ${ctx.reason}`);
        }).subscribe();

        return () => {
            sub.unsubscribe()
        }
    }, [])
    
    return (
        <>
        <div className="events-list">
            <h1>Ваши события</h1>
            {events && events.map(event => <Event key={event.id.toString() + event.event_type + event.author.id.toString()} event={event} />)}
        </div>
        {loadingStatus === 'loading' && <h2>Loading...</h2>}
        {loadingStatus === 'failed' && <h2>Не удалось загрузить Ваши события...</h2>}
        <div className="lower-bound" style={{height: '1000px', zIndex: -100, position: 'absolute' }} ref={ref}></div>
        </>
    )
}

export default EventsList