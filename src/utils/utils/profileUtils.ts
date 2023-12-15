import { IProfile } from "../interfaces/userInterfaces"

class ProfileUtils {
    avatarPlaceholderUrl = `${process.env.REACT_APP_SERVER_HOST}/media/placeholder.jpg`

    augmentAvatarUrls(profiles: IProfile[]): void {
        profiles.forEach(profile => {
            if (!profile.avatar)
                profile.avatar = this.avatarPlaceholderUrl
        })
    }
}

export default new ProfileUtils()