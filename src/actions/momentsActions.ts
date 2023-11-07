import { IMoment, IMomentLike, MomentCreationData, MomentLikeCreationData } from "../utils/interfaces/momentsInterfaces";
import { IUser } from "../utils/interfaces/userInterfaces";
import { mockMomentLikes, mockMoments, mockUsers } from "../utils/mockData";

class MomentsActions {
    async getMomentsByPage(page: number, user: IUser): Promise<{ moments: IMoment[], numberOfPages: number }> {
        const users = mockUsers(3)
        const moments = mockMoments(3, users)
        const numberOfPages = 2
        return {moments, numberOfPages}
    }

    async likeMoment(momentLikeCreationData: MomentLikeCreationData): Promise<IMomentLike | null> {
        const { moment, author } = momentLikeCreationData
        const newLike: IMomentLike = mockMomentLikes(1, moment, author)[0]
        return newLike
    }

    async unlikeMoment(like: MomentLikeCreationData): Promise<IMomentLike | null> {
        const { moment, author } = like
        return mockMomentLikes(1, moment, author)[0]
    }

    async createMoment(momentCreationData: MomentCreationData): Promise<IMoment | null> {
        const newMoment: IMoment = {
            ...momentCreationData,
            image: 'https://c4.wallpaperflare.com/wallpaper/482/480/58/beautyful-scenery-wallpaper-preview.jpg',
            id: Math.random().toString(),
            creation_date: (new Date()).toLocaleTimeString(),
            comments: [],
            tags: [],
            isLiked: false
        }
        return newMoment
    }
}

export default new MomentsActions()