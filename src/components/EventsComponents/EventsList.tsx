import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getEvents, selectEvents, setCurrentPage, setEvents } from "../../store/slises/eventsSlice";
import Event from "./Event";
import './EventsList.scss'
import { useInView } from "react-intersection-observer";

const EventsList: FC = () => {
    const events = useAppSelector(selectEvents)
    const dispatch = useAppDispatch()
    const loadingStatus = useAppSelector(state => state.events.status)
    const { ref, inView } = useInView({
        threshold: .01
    })

    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])

    useEffect(() => {
        return function() {
            dispatch(setCurrentPage(1))
            dispatch(setEvents([]))
        }
    }, [])

    useEffect(() => {
        if (inView) {
            if (events.length) {
                dispatch(setCurrentPage())
            }
            dispatch(getEvents())
        }
    }, [inView, dispatch])
    
    return (
        <>
        <div className="events-list">
            <h1>Ваши события</h1>
            {events.map(event => <Event key={event.id.toString() + event.event_type + event.author.id.toString()} event={event} />)}
        </div>
        {loadingStatus === 'loading' && <h2>Loading...</h2>}
        {loadingStatus === 'failed' && <h2>Не удалось загрузить Ваши события...</h2>}
        <div className="lower-bound" style={{height: '1000px', zIndex: -100, position: 'absolute' }} ref={ref}></div>
        </>
    )
}

export default EventsList