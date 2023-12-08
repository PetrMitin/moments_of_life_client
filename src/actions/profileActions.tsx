import { IMoment } from "../utils/interfaces/momentsInterfaces"
import { IProfile, ProfileUpdateData } from "../utils/interfaces/userInterfaces"
import { mockMoments, mockUsers } from "../utils/mockData"

class ProfileActions {
    async updateProfileData(profileUpdateData: ProfileUpdateData): Promise<IProfile | null> {
        const newUser: IProfile = mockUsers(1)[0]
        newUser.id = profileUpdateData.id
        newUser.user.email = profileUpdateData.email
        newUser.user.password = profileUpdateData.password
        newUser.user.username = profileUpdateData.username
        return newUser
    }

    async getUserMoments(page: number, user: IProfile): Promise<{ moments: IMoment[], numberOfPages: number }> {
        const test_user_id = 171332
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${test_user_id}/moments?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const moments = await res.json()
            console.log(moments)
            const numberOfPages = 2
            return {moments, numberOfPages}
        }
        return {moments: [], numberOfPages: 0}
    }

    async getUserDataById(userId: number): Promise<{userData: IProfile | null, isSubscribedFlag: boolean}> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${userId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const { profile, is_subscribed_flag } = await res.json()
            console.log({ profile, is_subscribed_flag })
            return {userData: profile, isSubscribedFlag: is_subscribed_flag}
        }
        return {userData: null, isSubscribedFlag: false}
    }

    async subscribe(author: IProfile, subscriber: IProfile): Promise<boolean> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/subscribe/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author_id: author.id,
                subscriber_id: subscriber.id
            })
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author_id: author.id,
                subscriber_id: subscriber.id
            })
        })
        if (res.ok) {
            const data = await res.json()
            return data?.successful || false
        }
        return false
    }
}

export default new ProfileActions()