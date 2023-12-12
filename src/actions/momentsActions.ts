import Cookies from "js-cookie";
import { IMoment, IMomentLike, MomentCreationData, MomentLikeCreationData } from "../utils/interfaces/momentsInterfaces";
import { IProfile } from "../utils/interfaces/userInterfaces";

class MomentsActions {
    imagePaceholder = 'https://sun9-29.userapi.com/impg/6CysCByL1-ikop35wmyyvkLeTKX_OycFWwK45g/BRo5b3Z03lo.jpg?size=807x807&quality=96&sign=053efb9bf05728b9078c4db9fce33f5b&c_uniq_tag=Fx_jYLU2j0gsH6YG8Frd4gjcaVW0w40DF-owL9wYHFA&type=album'

    async getMomentsByPage(page: number, user: IProfile): Promise<IMoment[]> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments/?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (res.ok) {
            const moments = await res.json()
            moments.forEach((moment: IMoment) => {
                moment.image = this.imagePaceholder
                moment.author.avatar = this.imagePaceholder
            })
            return moments
        }
        return []
    }

    async likeMoment(momentLikeCreationData: MomentLikeCreationData): Promise<IMomentLike | null> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: JSON.stringify({
                moment_id: momentLikeCreationData.moment.id, 
                author_id: momentLikeCreationData.author.id
            }),
            credentials: 'include'
        })
        if (res.ok) {
            const like = await res.json()
            return {id: like.id, moment_id: like.moment.id, author_id: like.author.id, creation_date: like.creation_date}
        }
        return null
    }

    async unlikeMoment(momentLikeCreationData: MomentLikeCreationData): Promise<MomentLikeCreationData | null> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments/unlike/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: JSON.stringify({
                moment_id: momentLikeCreationData.moment.id, 
                author_id: momentLikeCreationData.author.id
            }),
            credentials: 'include'
        })
        if (res.ok) {
            const deletionData = await res.json()
            return deletionData.successful ? momentLikeCreationData : null
        }
        return null
    }

    async createMoment(momentCreationData: MomentCreationData): Promise<IMoment | null> {
        const momentCreationFormData: FormData = new FormData()
        let key: keyof MomentCreationData
        for (key in momentCreationData) {
            let val = momentCreationData[key]
            momentCreationFormData.append(key, typeof val == 'object' && !(val instanceof File)  ? JSON.stringify(val) : val)
        }
        
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments/create/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: momentCreationFormData,
            credentials: 'include'
        })
        if (res.ok) {
            const data = await res.json()
            return null
        }
        return null
    }
}

export default new MomentsActions()