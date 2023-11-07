import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileActions from "../../actions/profileActions";
import { IUser, UserUpdateData } from "../../utils/interfaces/userInterfaces";
import { ProfileState } from "../../utils/interfaces/sliceInterfaces/profileSliceInterfaces";
import { setCurrentUser } from "./authorizationSlice";
import { IMoment } from "../../utils/interfaces/momentsInterfaces";
import { RootState } from "../store";

const initialState: ProfileState = {
    profileUser: null,
    userMoments: [],
    currentPage: 1,
    numberOfPages: 0,
    status: 'idle',
    isSubscribed: false
}

export const getUserData = createAsyncThunk<{user: IUser | null, isSubscribed: boolean}, string | undefined, {state: RootState}>(
    'profile/getUser',
    async (id, {getState}) => {
        let user: IUser | null = getState().authorization.currentUser
        let isSubscribed = false
        if (id) {
            const {userData, isSubscribedFlag} = await profileActions.getUserDataById(id)
            user = userData
            isSubscribed = isSubscribedFlag
        }
        return {user, isSubscribed}
    }
)

export const updateProfile = createAsyncThunk(
    'profile/update',
    async (updateProfileData: UserUpdateData, { dispatch }) => {
        const updatedUser = await profileActions.updateProfileData(updateProfileData)
        dispatch(setCurrentUser(updatedUser || undefined))
        return updatedUser
    }
)

export const getUserMoments = createAsyncThunk<{
        moments: IMoment[],
        numberOfPages: number,
    }, IUser | null, {state: RootState}>(
    'profile/getMoments',
    async (user, { getState }) => {
        const state = getState()
        user = user || state.authorization.currentUser
        if (user) {
            const {moments, numberOfPages} = await profileActions.getUserMoments(state.profile.currentPage, user)
            return {moments, numberOfPages}
        }
        return {moments: [], numberOfPages: 0}
    }
)

export const subscribe = createAsyncThunk<boolean, void, {state: RootState}>(
    'profile/subscribe',
    async (_, { getState }) => {
        const state = getState()
        const currentUser = state.authorization.currentUser
        const profileUser = state.profile.profileUser
        if (currentUser && profileUser && currentUser.id !== profileUser.id) {
            const success = await profileActions.subscribe(profileUser, currentUser)
            return success
        }
        return false
    }
)

export const unsubscribe = createAsyncThunk<boolean, void, {state: RootState}>(
    'profile/unsubscribe',
    async (_, { getState }) => {
        const state = getState()
        const currentUser = state.authorization.currentUser
        const profileUser = state.profile.profileUser
        if (currentUser && profileUser && currentUser.id !== profileUser.id) {
            const success = await profileActions.unsubscribe(profileUser, currentUser)
            return success
        }
        return false
    }
)

const ProfileSlice = createSlice(
    {
        name: 'profile',
        initialState,
        reducers: {
            setCurrentPage: (state, action: PayloadAction<number>) => {
                state.currentPage = action.payload
            },
            setUserMoments: (state, action: PayloadAction<IMoment[]>) => {
                state.userMoments = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.status = 'idle'
                const userData = action.payload
                if (userData.user) {
                    state.profileUser = userData.user
                    state.isSubscribed = userData.isSubscribed
                }
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'idle'
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(getUserMoments.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getUserMoments.fulfilled, (state, action) => {
                state.status = 'idle'
                state.numberOfPages = action.payload.numberOfPages
                state.userMoments = action.payload.moments
            })
            .addCase(getUserMoments.rejected, (state, action) => {
                state.status = 'failed'
                state.numberOfPages = 0
                state.userMoments = []
            })
            .addCase(subscribe.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isSubscribed = action.payload
            })
            .addCase(unsubscribe.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isSubscribed = !action.payload
            })
        }
    }
)

export const selectCurrentPage = (state: RootState) => state.profile.currentPage

export const selectNumberOfPages = (state: RootState) => state.profile.numberOfPages

export const selectUserMoments = (state: RootState) => state.profile.userMoments

export const selectProfileUser = (state: RootState) => state.profile.profileUser

export const selectIsSubscribed = (state: RootState) => state.profile.isSubscribed

export const { setCurrentPage, setUserMoments } = ProfileSlice.actions

export const profileReducer = ProfileSlice.reducer