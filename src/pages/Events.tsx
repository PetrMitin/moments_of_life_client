import {FC} from 'react'
import EventsList from '../components/EventsComponents/EventsList'

const Events: FC = () => {
    return (
        <div className="events-container">
            <EventsList />
        </div>
    )
}

export default Events