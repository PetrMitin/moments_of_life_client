import { IMoment } from "../interfaces/momentsInterfaces";

class MomentUtils {
    imagePlaceholderUrl = `${process.env.REACT_APP_SERVER_HOST}/media/placeholder.jpg`
    avatarPlaceholderUrl = `${process.env.REACT_APP_SERVER_HOST}/media/placeholder.jpg`

    augmentImageUrls(moments: IMoment[]): void {
        moments.forEach(moment => {
            if (!moment.image)
                moment.image = this.imagePlaceholderUrl
            else
                moment.image = `${process.env.REACT_APP_SERVER_HOST}/media/${moment.image}`
            if (!moment.author.avatar)
                moment.author.avatar = this.avatarPlaceholderUrl
            else
                moment.author.avatar = `${process.env.REACT_APP_SERVER_HOST}/media/${moment.author.avatar}`
        })
    }
}

export default new MomentUtils()