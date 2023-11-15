import { FC, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const SearchBar: FC<{ setQuery: React.Dispatch<React.SetStateAction<string>> }> = ({ setQuery }) => {
    const [queryInput, setQueryInput] = useState('')
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

    const handleQueryInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout)
            setSearchTimeout(null)
        }
        setSearchTimeout(setTimeout(() => setQueryInput(e.target.value), 750))
    }

    useEffect(() => {
        setQuery(queryInput)
    }, [queryInput])

    return (
        <div className="search-bar">
            <FloatingLabel label='Искать моменты и пользователей'>
                <Form.Control
                type='text'
                onChange={handleQueryInputChange}
                placeholder="Тэг или имя пользователя" /> 
            </FloatingLabel>
        </div>
    )
}

export default SearchBar