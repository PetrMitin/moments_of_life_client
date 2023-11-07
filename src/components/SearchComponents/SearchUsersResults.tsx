import { FC } from "react";
import UserSearchResult from "./UserSearchResult";
import { IUser } from "../../utils/interfaces/userInterfaces";
import './SearchResult.scss'

const SeachUsersResults: FC<{ users: IUser[] }> = ({ users }) => {
    return (
        <>
            {users.map(user => <UserSearchResult key={user.id} user={user} />)}
        </>
    )
}

export default SeachUsersResults