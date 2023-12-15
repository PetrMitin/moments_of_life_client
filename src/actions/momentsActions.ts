import Cookies from "js-cookie";
import { IMoment, IMomentLike, MomentCreationData, MomentLikeCreationData } from "../utils/interfaces/momentsInterfaces";
import momentUtils from "../utils/utils/momentUtils";

class MomentsActions {
    async getMomentsByPage(page: number): Promise<IMoment[]> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments/?page=${page}`, {
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
            console.log(data);
            return data
        }
        return null
    }
}

export default new MomentsActions()