import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getEvents, selectEvents } from "../../store/slises/eventsSlice";
import Event from "./Event";
import './EventsList.scss'

const EventsList: FC = () => {
    const events = useAppSelector(selectEvents)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])

    console.log(events);
    

    return (
        <>
        <div className="events-list">
            <h1>Ваши события</h1>
            {events.map(event => <Event key={event.id.toString() + event.event_type} event={event} />)}
        </div>
        </>
    )
}

export default EventsList