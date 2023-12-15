import { LoginData, RegistrationData } from "../utils/interfaces/sliceInterfaces/authorizationSliceInterfaces";
import { IProfile } from "../utils/interfaces/userInterfaces";
import Cookies from 'js-cookie'
import profileUtils from "../utils/utils/profileUtils";

class AuthorizationActions {
    async loginWithEmail(loginData: LoginData): Promise<IProfile | null> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: JSON.stringify(loginData),
            credentials: 'include'
        })
        if (res.ok) {
            console.log(res.headers)
            const user = await res.json()
            profileUtils.augmentAvatarUrls([user])
            localStorage.setItem('user', JSON.stringify(user))
            return user
        }
        return null
    }

    async registrateUser(registrationData: RegistrationData): Promise<IProfile | null> {
        const registrationFormData: FormData = new FormData()
        let key: keyof RegistrationData
        for (key in registrationData) {
            let val = registrationData[key]
            registrationFormData.append(key, typeof val == 'object' && !(val instanceof File)  ? JSON.stringify(val) : val)
        }

        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/registration/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            body: registrationFormData,
            credentials: 'include'
        })
        if (res.ok) {
            const user = await res.json()
            profileUtils.augmentAvatarUrls([user])
            localStorage.setItem('user', JSON.stringify(user))
            return user
        }
        return null
    }

    async logoutUser(): Promise<boolean> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken') || ''
            },
            credentials: 'include'
        })
        if (res.ok) {
            localStorage.removeItem('user')
            return true
        }
        return false
    }

    async getCSRFToken(): Promise<boolean> {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/get-csrf-token/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (res.ok) {
            return true
        }
        return false
    }
}

export default new AuthorizationActions()