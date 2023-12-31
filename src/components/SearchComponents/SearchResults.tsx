import { FC } from "react";
import SearchMomentsResults from "./SearchMomentsResults";
import SeachUsersResults from "./SearchUsersResults";
import { useAppSelector } from "../../store/hooks";
import { selectSearchMomentsResults, selectSearchStatus, selectSearchUsersResults } from "../../store/slises/searchSlice";
import './SearchResults.scss'

const SearchResults: FC<{ query: string }> = ({ query }) => {
    const users = useAppSelector(selectSearchUsersResults)
    const moments = useAppSelector(selectSearchMomentsResults)
    const status = useAppSelector(selectSearchStatus)
    const isNothingFound = !users.length && !moments.length

    return (
        <>
            { status === 'loading' && <h3>Loading...</h3> }
            <div className="search-results">
                { isNothingFound && query && status !== 'loading'
                ? <h3>Ничего не найдено!</h3>
                :<>
                    <SeachUsersResults users={users} />
                    <SearchMomentsResults moments={moments} />
                </>
                }
            </div>
        </>
    )
}

export default SearchResults