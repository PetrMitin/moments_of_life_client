import { IMoment } from "../utils/interfaces/momentsInterfaces"
import { IUser, UserUpdateData } from "../utils/interfaces/userInterfaces"
import { mockMoments, mockUsers } from "../utils/mockData"

class ProfileActions {
    async updateProfileData(profileUpdateData: UserUpdateData): Promise<IUser | null> {
        const newUser: IUser = mockUsers(1)[0]
        newUser.id = profileUpdateData.id
        newUser.email = profileUpdateData.email
        newUser.password = profileUpdateData.password
        newUser.username = profileUpdateData.username
        return newUser
    }

    async getUserMoments(page: number, user: IUser): Promise<{ moments: IMoment[], numberOfPages: number }> {
        const moments = mockMoments(45, [user])
        const numberOfPages = 2
        return {moments, numberOfPages}
    }

    async getUserDataById(userId: string): Promise<{userData: IUser | null, isSubscribedFlag: boolean}> {
        const userData = mockUsers(1)[0]
        userData.id = userId
        return {userData, isSubscribedFlag: false}
    }

    async subscribe(author: IUser, subscriber: IUser): Promise<boolean> {
        return true
    }

    async unsubscribe(author: IUser, subscriber: IUser): Promise<boolean> {
        return true
    }
}

export default new ProfileActions()