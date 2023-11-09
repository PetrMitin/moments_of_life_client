import { LoginData, RegistrationData } from "../utils/interfaces/sliceInterfaces/authorizationSliceInterfaces";
import { IUser } from "../utils/interfaces/userInterfaces";
import { mockUsers } from "../utils/mockData";

class AuthorizationActions {
    async loginWithEmail(loginData: LoginData): Promise<IUser | null> {
        const user = mockUsers(1)[0]
        const isSuccessfull = (loginData.email === 'admin@admin' && loginData.password === 'admin')
        if (isSuccessfull) {
            localStorage.setItem('user', JSON.stringify(user))
            return user
        }
        return null
    }

    async registrateUser(registrationData: RegistrationData): Promise<IUser | null> {
        const user = mockUsers(1)[0]
        localStorage.setItem('user', JSON.stringify(user))
        return !!(registrationData.email && registrationData.username && registrationData.password) ? user : null;
    }

    async logoutUser(): Promise<boolean> {
        localStorage.removeItem('user')
        return true;
    }
}

export default new AuthorizationActions()