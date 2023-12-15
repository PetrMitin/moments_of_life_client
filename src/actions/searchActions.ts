import { IMoment } from "../utils/interfaces/momentsInterfaces";
import { ISearchResults } from "../utils/interfaces/sliceInterfaces/searchSliceInterfaces";
import { IProfile } from "../utils/interfaces/userInterfaces";
import momentUtils from "../utils/utils/momentUtils";
import profileUtils from "../utils/utils/profileUtils";

class SearchActions {
    async searchByTextQuery(query: string): Promise<ISearchResults> {
        let users: IProfile[] = []
        let moments: IMoment[] = []
        query = query.replaceAll('#', '%23')

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
            },
            credentials: 'include'
        })
        if (profileRes.ok) {
            users = await profileRes.json()
            profileUtils.augmentAvatarUrls(users)
        }

        const momentRes = await fetch(`${process.env.REACT_APP_SERVER_URL}/moments/search/?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (momentRes.ok) {
            moments = (await momentRes.json())
            momentUtils.augmentImageUrls(moments)
        }
        return {
            users,
            moments
        }
    }
}

export default new SearchActions()