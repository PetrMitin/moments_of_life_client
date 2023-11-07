import { FC } from "react";
import MomentSearchResult from "./MomentSearchResult";
import { IMoment } from "../../utils/interfaces/momentsInterfaces";
import './SearchResult.scss'

const SearchMomentsResults: FC<{ moments: IMoment[] }> = ({ moments }) => {
    return (
        <>
            {moments.map(moment => <MomentSearchResult key={moment.id} moment={moment} />)}
        </>
    )
}

export default SearchMomentsResults