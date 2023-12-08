import { IMoment } from "../utils/interfaces/momentsInterfaces";
import { ISearchResults } from "../utils/interfaces/sliceInterfaces/searchSliceInterfaces";
import { IProfile } from "../utils/interfaces/userInterfaces";
import { mockMoments, mockUsers } from "../utils/mockData";

class SearchActions {
    imagePaceholder = 'https://sun9-29.userapi.com/impg/6CysCByL1-ikop35wmyyvkLeTKX_OycFWwK45g/BRo5b3Z03lo.jpg?size=807x807&quality=96&sign=053efb9bf05728b9078c4db9fce33f5b&c_uniq_tag=Fx_jYLU2j0gsH6YG8Frd4gjcaVW0w40DF-owL9wYHFA&type=album'

    async searchByTextQuery(query: string): Promise<ISearchResults> {
        let users: IProfile[] = []
        let moments: IMoment[] = []
        query = query.replaceAll('#', '%23')
        console.log(query);

        if (!query) {
            return {
                users,
                moments
            }
        }

        const profileRes = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile/search/?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (profileRes.ok) {
            users = await profileRes.json()
            console.log(users)
        }

        const momentRes = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments/search/?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (momentRes.ok) {
            moments = (await momentRes.json())
            moments.forEach((moment: IMoment) => {
                moment.image = this.imagePaceholder
                moment.author.avatar = this.imagePaceholder
            })
            console.log(moments)
        }
        return {
            users,
            moments
        }
    }
}

export default new SearchActions()