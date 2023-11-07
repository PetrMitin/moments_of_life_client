import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AuthorizationState, LoginData, RegistrationData } from "../../utils/interfaces/sliceInterfaces/authorizationSliceInterfaces"
import authorizationActions from "../../actions/authorizationActions"
import { RootState } from "../store"
import { useNavigate } from "react-router-dom"
import { IUser, UserUpdateData } from "../../utils/interfaces/userInterfaces"
import profileActions from "../../actions/profileActions"

const initialState: AuthorizationState = {
    currentUser: null
}

export const login = createAsyncThunk(
    'authorization/login',
    async (loginData: LoginData) => {
        const isLoggedIn = await authorizationActions.loginWithEmail(loginData)
        return isLoggedIn
    }
)

export const registration = createAsyncThunk(
    'authorization/registration',
    async (registrationData: RegistrationData) => {
        const isSuccessfullyRegistrated = await authorizationActions.registrateUser(registrationData)
        return isSuccessfullyRegistrated
    }
)

export const logout = createAsyncThunk(
    'authorization/logout',
    async () => {
        const isSuccessfullLogOut = await authorizationActions.logoutUser()
        return isSuccessfullLogOut
    }
)

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<IUser | undefined>) => {
            const user = action.payload
            if (!user) { 
                state.currentUser = null
            } else {
                state.currentUser = user
                localStorage.setItem('user', JSON.stringify(state.currentUser))
            }
        }
    },
    extraReducers: builder => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            console.log(action.error)
            state.currentUser = null
        })
        .addCase(registration.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        .addCase(registration.rejected, (state, action) => {
            console.log(action.error)
            state.currentUser = null
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.currentUser = null
        })
        .addCase(logout.rejected, (state, action) => {
            state.currentUser = null
            console.log(action.error)
        })
    },
})

export const selectCurrentUser = (state: RootState) => state.authorization.currentUser

export const { setCurrentUser } = authorizationSlice.actions

export const authorizationReducer =  authorizationSlice.reducer