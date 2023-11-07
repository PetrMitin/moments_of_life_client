import { IUser } from "../utils/interfaces/userInterfaces";
import { mockEvents } from "../utils/mockData";

class EventsActions {
    async getEvents(user: IUser) {
        const events = mockEvents(5)
        return events
    }
}

export default new EventsActions()