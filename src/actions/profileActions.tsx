import Cookies from "js-cookie"
import { IMoment } from "../utils/interfaces/momentsInterfaces"
import { IProfile, ProfileUpdateData } from "../utils/interfaces/userInterfaces"
import momentUtils from "../utils/utils/momentUtils"
import profileUtils from "../utils/utils/profileUtils"

class ProfileActions {
    async updateProfileData(profileUpdateData: ProfileUpdateData): Promise<IProfile | null> {
        const updateFormData: FormData = new FormData()
        let key: keyof ProfileUpdateData
        for (key in profileUpdateData) {
            let val = profileUpdateData[key]
            if (val) updateFormData.append(key, typeof val == 'number' ? JSON.stringify(val) : val)
        }

        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${profileUpdateData.id}/update/`, {
            method: 'PUT',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: updateFormData,
            credentials: 'include'
        })
        if (res.ok) {
            const user = await res.json()
            localStorage.setItem('user', JSON.stringify(user))
            return user
        }
        return null
    }

    async getUserMoments(page: number, user: IProfile): Promise<IMoment[]> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${user.id}/moments/?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (res.ok) {
            const moments = await res.json()
            momentUtils.augmentImageUrls(moments)
            return moments
        }
        return []
    }

    async getUserDataById(userId: number): Promise<{userData: IProfile | null, isSubscribedFlag: boolean}> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${userId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (res.ok) {
            const { profile, is_subscribed_flag } = await res.json()
            profileUtils.augmentAvatarUrls([profile])
            return {userData: profile, isSubscribedFlag: is_subscribed_flag}
        }
        return {userData: null, isSubscribedFlag: false}
    }

    async subscribe(author: IProfile, subscriber: IProfile): Promise<boolean> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/subscribe/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: JSON.stringify({
                author_id: author.id,
                subscriber_id: subscriber.id
            }),
            credentials: 'include'
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            return true
        }
        return false
    }

    async unsubscribe(author: IProfile, subscriber: IProfile): Promise<boolean> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/unsubscribe/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: JSON.stringify({
                author_id: author.id,
                subscriber_id: subscriber.id
            }),
            credentials: 'include'
        })
        if (res.ok) {
            const data = await res.json()
            return data?.successful || false
        }
        return false
    }
}

export default new ProfileActions()