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
        const test_user_id = 21326
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

    async getUserDataById(userId: string): Promise<{userData: IProfile | null, isSubscribedFlag: boolean}> {
        const test_user_id = 21326
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/${test_user_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const userData = await res.json()
            console.log(userData)
            return {userData, isSubscribedFlag: false}
        }
        return {userData: null, isSubscribedFlag: false}
    }

    async subscribe(author: IProfile, subscriber: IProfile): Promise<boolean> {
        return true
    }

    async unsubscribe(author: IProfile, subscriber: IProfile): Promise<boolean> {
        return true
    }
}

export default new ProfileActions()