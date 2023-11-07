import { FC, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

const SearchBar: FC<{ setQuery: React.Dispatch<React.SetStateAction<string>> }> = ({ setQuery }) => {
    const [queryInput, setQueryInput] = useState('')

    const handleQueryInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setQueryInput(e.target.value)
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