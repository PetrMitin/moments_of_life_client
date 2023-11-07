import { FC } from "react";
import { Image } from 'react-bootstrap'
import { IMoment } from "../../utils/interfaces/momentsInterfaces";
import Logo from "../ReusableComponents/Icons/Logo";

const MomentSearchResult: FC<{ moment: IMoment }> = ({ moment }) => {
    return (
        <div className="search-result">
            <Logo />
            <Image src={moment.image} />
        </div>
    )
}

export default MomentSearchResult