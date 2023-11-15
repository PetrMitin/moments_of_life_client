import { FC } from "react";
import UserSearchResult from "./UserSearchResult";
import { IProfile } from "../../utils/interfaces/userInterfaces";
import './SearchResult.scss'

const SeachUsersResults: FC<{ users: IProfile[] }> = ({ users }) => {
    return (
        <>
            {users.map(user => <UserSearchResult key={user.id} user={user} />)}
        </>
    )
}

export default SeachUsersResults