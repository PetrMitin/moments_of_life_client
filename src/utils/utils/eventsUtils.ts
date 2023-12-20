import { IEvent } from "../interfaces/eventsInterfaces"

class EventsUtils {
    avatarPlaceholderUrl = `${process.env.REACT_APP_SERVER_HOST}/media/placeholder.jpg`

    augmentAvatarUrls(events: IEvent[]): void {
        events.forEach(event => {
            if (!event.author.avatar) event.author.avatar = this.avatarPlaceholderUrl
            else event.author.avatar = `${process.env.REACT_APP_SERVER_HOST}${event.author.avatar}`
        })
    }
}

export default new EventsUtils()