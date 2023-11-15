import { FC } from "react";
import { Card, Stack } from 'react-bootstrap'
import { IProfile } from "../../../utils/interfaces/userInterfaces";
import UserAvatar from "../../ReusableComponents/UserAvatar";
import moment from "moment";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../utils/consts/routeConsts";

const MomentHeader: FC<{ author: IProfile, creationDate: string }> = ({ author, creationDate }) => {
    return (
        <div className="moment-header">
            <Stack direction="horizontal" >
                <UserAvatar avatar={author.avatar} />
                <Stack className="moment-header-info">
                    <Card.Subtitle>
                        <Link to={`${RoutePaths.PROFILE_ROUTE}/${author.id}`}>{author.user.username}</Link>
                    </Card.Subtitle>
                    <p>{moment(creationDate).locale('ru').fromNow()}</p>
                </Stack>
            </Stack>
        </div>
    )
}

export default MomentHeader