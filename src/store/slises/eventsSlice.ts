import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventsState } from "../../utils/interfaces/sliceInterfaces/eventsSliceInterfaces";
import eventsActions from "../../actions/eventsActions";
import { RootState } from "../store";
import { IEvent } from "../../utils/interfaces/eventsInterfaces";

const initialState: EventsState = {
    events: [],
    status: 'idle',
    currentPage: 1
}

export const getEvents = createAsyncThunk<IEvent[], void, {state: RootState}>(
    'events/getEvents',
    async (_, { getState }) => {
        const state = getState()
        const currentUser = state.authorization.currentUser
        const currentPage = state.events.currentPage
        if (currentUser) {
            const events = await eventsActions.getEvents(currentUser, currentPage)
            return events
        }
        return []
    }
)

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number | undefined>) => {
            const currPage = state.currentPage
            state.currentPage = action.payload ? action.payload : currPage + 1
        },
        setEvents: (state, action: PayloadAction<IEvent[]>) => {
            state.events = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getEvents.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getEvents.fulfilled, (state, action) => {
            state.status = 'idle'
            if (state.currentPage === 1) 
                state.events = action.payload
            else 
                state.events = [...state.events, ...action.payload]
        })
        .addCase(getEvents.rejected, (state, action) => {
            state.status = 'failed'
            state.events = []
            console.log(action.error)
        })
    }
})

export const selectEvents = (state: RootState) => state.events.events

export const { setCurrentPage, setEvents } = eventsSlice.actions

export const eventsReducer = eventsSlice.reducer