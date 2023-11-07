import {FC} from 'react'
import SearchBarWithResults from '../components/SearchComponents/SearchBarWithResults'

const Search: FC = () => {
    return (
        <div className="search-container">
            <SearchBarWithResults />
        </div>
    )
}

export default Search