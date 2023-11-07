import { FC } from "react"
import { Image } from 'react-bootstrap'
import './UserAvatar.scss'

const UserAvatar: FC<{ avatar: string, variant?: string }> = ({ avatar, variant='' }) => {
    return (
        <Image src={avatar} className={`user-avatar ${variant}`} roundedCircle />
    )
}

export default UserAvatar