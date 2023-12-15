import { IMoment } from "../interfaces/momentsInterfaces";

class MomentUtils {
    imagePlaceholderUrl = `${process.env.REACT_APP_SERVER_HOST}/media/placeholder.jpg`
    avatarPlaceholderUrl = `${process.env.REACT_APP_SERVER_HOST}/media/placeholder.jpg`

    augmentImageUrls(moments: IMoment[]): void {
        moments.forEach(moment => {
            if (!moment.image)
                moment.image = this.imagePlaceholderUrl
            if (!moment.author.avatar)
                moment.author.avatar = this.avatarPlaceholderUrl
        })
    }
}

export default new MomentUtils()