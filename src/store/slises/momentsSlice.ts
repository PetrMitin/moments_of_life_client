import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IMoment, IMomentLike, MomentCreationData, MomentLikeCreationData } from "../../utils/interfaces/momentsInterfaces"
import momentsActions from "../../actions/momentsActions"
import { RootState } from "../store"
import { MomentsState } from "../../utils/interfaces/sliceInterfaces/momentsSliceInterfaces"
import { CommentCreationData, CommentLikeCreationData, IComment, ICommentLike } from "../../utils/interfaces/commentInterfaces"
import commentActions from "../../actions/commentActions"
import { setUserMoments } from "./profileSlice"

const initialState: MomentsState = {
    moments: [],
    currentPage: 1,
    status: 'idle'
}

export const selectMoments = (state: RootState) => state.moments.moments

export const getMoments = createAsyncThunk<IMoment[], void, {state: RootState}>(
    'moments/getMoments', 
    async (_, { getState }) => {
        const state = getState()
        const user = state.authorization.currentUser
        const momentsData = user 
                            ? await momentsActions.getMomentsByPage(state.moments.currentPage, user) 
                            : []
        return momentsData
    }
)

export const createMoment = createAsyncThunk<IMoment | null, MomentCreationData, {state: RootState}>(
    'moments/create',
    async (momentCreationData: MomentCreationData, { dispatch, getState }) => {
        const newMoment = await momentsActions.createMoment(momentCreationData)
        if (newMoment) dispatch(setUserMoments([newMoment, ...(getState().profile.userMoments)]))
        return newMoment
    }
)

export const likeMoment = createAsyncThunk(
    'moments/like',
    async (momentLikeCreationData: MomentLikeCreationData) => {
        const newLike = await momentsActions.likeMoment(momentLikeCreationData)
        return newLike
    }
)

export const unlikeMoment = createAsyncThunk(
    'moments/unlike',
    async (momentLike: MomentLikeCreationData) => {
        const isUnliked = await momentsActions.unlikeMoment(momentLike)
        return isUnliked
    }
)

export const addComment = createAsyncThunk(
    'moments/comments/add',
    async (commentCreationData: CommentCreationData) => {
        const newComment = await commentActions.addComment(commentCreationData)
        return newComment
    }
)

export const likeComment = createAsyncThunk(
    'moments/comments/like',
    async (commentLikeCreationData: CommentLikeCreationData) => {
        const newLike = await commentActions.likeComment(commentLikeCreationData)
        return newLike
    }
)

export const unlikeComment = createAsyncThunk(
    'moments/comments/unlike',
    async (likeData: CommentLikeCreationData) => {
        const isUnliked = await commentActions.unlikeComment(likeData)
        return isUnliked
    }
)

const momentsSlice = createSlice({
    name: 'moments',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number | undefined>) => {
            const currPage = state.currentPage
            state.currentPage = action.payload ? action.payload : currPage + 1
        },
        setMoments: (state, action: PayloadAction<IMoment[]>) => {
            state.moments = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMoments.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getMoments.fulfilled, (state, action) => {
            state.status = 'idle'
            state.moments = [...state.moments, ...action.payload]
        })
        .addCase(getMoments.rejected, (state, action) => {
            state.status = 'failed'
            state.moments = []
            console.log(action.error)
        })
        .addCase(createMoment.fulfilled, (state, action) => {
            const moment = action.payload
            if (moment) state.moments.push(moment)
        })
        .addCase(createMoment.rejected, (state, action) => {
            console.log(action.error)
        })
        .addCase(likeMoment.fulfilled, (state, action) => {
            const like = action.payload
            if (like) {
                const idx = state.moments.findIndex(moment => moment.id === like.moment_id)
                if (idx !== -1)
                    state.moments[idx].isLiked = true
            }
        })
        .addCase(likeMoment.rejected, (state, action) => {
            console.log(action.error)
        })
        .addCase(unlikeMoment.fulfilled, (state, action) => {
            const like = action.payload
            if (like) {
                const idx = state.moments.findIndex(moment => moment.id === like.moment_id)
                if (idx !== -1)
                    state.moments[idx].isLiked = false
            }
        })
        .addCase(unlikeMoment.rejected, (state, action) => {
            console.log(action.error)
        })
        .addCase(addComment.fulfilled, (state, action) => {
            const comment = action.payload
            if (comment) {
                const idx = state.moments.findIndex(moment => moment.id === comment.moment_id)
                if (idx !== -1)
                    state.moments[idx].comments.unshift(comment)
            }
        })
        .addCase(addComment.rejected, (state, action) => {
            console.log(action.error)
        })
        .addCase(likeComment.fulfilled, (state, action) => {
            const like = action.payload
            if (like) {
                const momentIdx = state.moments.findIndex(moment => moment.id === like.moment_id)
                if (momentIdx !== -1) {
                    const commentIdx = state.moments[momentIdx].comments.findIndex(comment => comment.id === like.comment_id)
                    if (commentIdx !== -1) {
                        state.moments[momentIdx].comments[commentIdx].isLiked = true
                    }
                }
            }
        })
        .addCase(likeComment.rejected, (state, action) => {
            console.log(action.error)
        })
        .addCase(unlikeComment.fulfilled, (state, action) => {
            const like = action.payload
            if (like) {
                const momentIdx = state.moments.findIndex(moment => moment.id === like.moment_id)
                if (momentIdx !== -1) {
                    const commentIdx = state.moments[momentIdx].comments.findIndex(comment => comment.id === like.comment_id)
                    if (commentIdx !== -1) {
                        state.moments[momentIdx].comments[commentIdx].isLiked = false
                    }
                }
            }
        })
        .addCase(unlikeComment.rejected, (state, action) => {
            console.log(action.error)
        })
    },
})

export const { setCurrentPage, setMoments } = momentsSlice.actions

export const momentsReducer =  momentsSlice.reducer