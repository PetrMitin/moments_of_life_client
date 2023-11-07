import {FC} from 'react'
import AuthorizationRouter from '../components/AuthorizationComponents/AuthorizationRouter'

const Authorization: FC = () => {
    return (
        <div className="authorization-container container">
            <AuthorizationRouter />
        </div>
    )
}

export default Authorization