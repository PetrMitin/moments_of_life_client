import { IMoment, IMomentLike, MomentCreationData, MomentLikeCreationData } from "../utils/interfaces/momentsInterfaces";
import { IProfile, isIProfile } from "../utils/interfaces/userInterfaces";
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
        const momentCreationFormData: FormData = new FormData()
        let key: keyof MomentCreationData
        for (key in momentCreationData) {
            let val = momentCreationData[key]
            momentCreationFormData.append(key, typeof val == 'object' && !(val instanceof File)  ? JSON.stringify(val) : val)
        }
        console.log(momentCreationFormData);
        
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments/create`, {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: momentCreationFormData
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            return null
        }
        return null
    }
}

export default new MomentsActions()