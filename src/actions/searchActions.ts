import { ISearchResults } from "../utils/interfaces/sliceInterfaces/searchSliceInterfaces";
import { mockMoments, mockUsers } from "../utils/mockData";

class SearchActions {
    async searchByTextQuery(query: string): Promise<ISearchResults> {
        const users = query ? mockUsers(3) : []
        const moments = query ? mockMoments(10, users) : []
        return {
            users,
            moments
        }
    }
}

export default new SearchActions()