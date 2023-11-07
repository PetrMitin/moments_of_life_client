import { FC, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { useAppDispatch } from "../../store/hooks";
import { search } from "../../store/slises/searchSlice";

const SearchBarWithResults: FC = () => {
    const [query, setQuery] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
       dispatch(search(query))
    }, [query])

    return (
        <div className="search-bar-with-results">
            <SearchBar setQuery={setQuery} />
            <SearchResults query={query} />
        </div>
    )
}

export default SearchBarWithResults