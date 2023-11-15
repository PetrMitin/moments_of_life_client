import { IMoment, IMomentLike, MomentCreationData, MomentLikeCreationData } from "../utils/interfaces/momentsInterfaces";
import { IProfile } from "../utils/interfaces/userInterfaces";
import { mockMomentLikes, mockMoments, mockUsers } from "../utils/mockData";

class MomentsActions {
    imagePaceholder = 'https://sun9-29.userapi.com/impg/6CysCByL1-ikop35wmyyvkLeTKX_OycFWwK45g/BRo5b3Z03lo.jpg?size=807x807&quality=96&sign=053efb9bf05728b9078c4db9fce33f5b&c_uniq_tag=Fx_jYLU2j0gsH6YG8Frd4gjcaVW0w40DF-owL9wYHFA&type=album'

    async getMomentsByPage(page: number, user: IProfile): Promise<IMoment[]> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const moments = (await res.json())
            moments.forEach((moment: IMoment) => {
                moment.image = this.imagePaceholder
                moment.author.avatar = this.imagePaceholder
            })
            console.log(moments)
            return moments
        }
        return []
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
            id: Math.random(),
            creation_date: (new Date()).toLocaleTimeString(),
            comments: [],
            tags: [],
            isLiked: false
        }
        return newMoment
    }
}

export default new MomentsActions()