import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventsState } from "../../utils/interfaces/sliceInterfaces/eventsSliceInterfaces";
import eventsActions from "../../actions/eventsActions";
import { RootState } from "../store";
import { IEvent } from "../../utils/interfaces/eventsInterfaces";
import { Centrifuge } from "centrifuge";

const initialState: EventsState = {
    events: [],
    status: 'idle',
    currentPage: 1,
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

export const connectToEventsMessages = createAsyncThunk<void, Centrifuge, {state: RootState}>(
    'events/getEvents',
    async (centrifuge, { getState }) => {
        const state = getState()
        const currentUser = state.authorization.currentUser
        if (currentUser) {
            eventsActions.connectToEventsMessages(currentUser.id, centrifuge)
        }
    }
)

export const unsubscribeToEventsMessages = createAsyncThunk<void, Centrifuge, {state: RootState}>(
    'events/getEvents',
    async (centrifuge) => {
        eventsActions.unsubscribeToEventsMessages(centrifuge)
    }
)

export const getCentrifugeToken = createAsyncThunk<void, Centrifuge, {state: RootState}>(
    'events/getEvents',
    async (centrifuge, { getState }) => {
        const state = getState()
        const currentUser = state.authorization.currentUser
        if (currentUser) {
            await eventsActions.getCentrifugeToken(centrifuge)
        }
    }
)

export const getCentrifugeTokenAndConnect = createAsyncThunk<void, Centrifuge, {state: RootState}>(
    'events/getEvents',
    async (centrifuge, { getState }) => {
        const state = getState()
        const currentUser = state.authorization.currentUser
        if (currentUser) {
            eventsActions.getCentrifugeToken(centrifuge).then(() => {
                console.log(centrifuge)
                eventsActions.connectToEventsMessages(currentUser.id, centrifuge)
            })
        }
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
        },
        appendToEvents: (state, action: PayloadAction<IEvent>) => {
            state.events = [action.payload, ...state.events]
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

export const { setCurrentPage, setEvents, appendToEvents } = eventsSlice.actions

export const eventsReducer = eventsSlice.reducer