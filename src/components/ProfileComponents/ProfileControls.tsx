import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slises/authorizationSlice";
import CreateMomentModal from "./CreateMomentModal";
import EditProfileModal from "./EditProfileModal";

const ProfileControls: FC = () => {
    const [showCreateMomentModal, setShowCreateMomentModal] = useState(false)
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)

    const handleShowCreateMomentClick: React.MouseEventHandler<HTMLButtonElement> = (e) => setShowCreateMomentModal(true)

    const handleHideCreateMoment = () => setShowCreateMomentModal(false)

    const handleShowEditProfileClick: React.MouseEventHandler<HTMLButtonElement> = (e) => setShowEditProfileModal(true)

    const handleHideEditProfile = () => setShowEditProfileModal(false)

    return (
        <div className="profile-controls">
            <Button variant='light' onClick={handleShowCreateMomentClick}>Создать момент</Button>
            <CreateMomentModal show={showCreateMomentModal} onHide={handleHideCreateMoment} />
            <Button variant='light' onClick={handleShowEditProfileClick}>Настройки профиля</Button>
            <EditProfileModal show={showEditProfileModal} onHide={handleHideEditProfile} />
        </div>
    )
}

export default ProfileControls