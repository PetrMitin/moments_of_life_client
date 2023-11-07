import { momentsReducer } from "./slises/momentsSlice"
import { authorizationReducer } from "./slises/authorizationSlice"
import { configureStore } from "@reduxjs/toolkit"
import { searchReducer } from "./slises/searchSlice"
import { profileReducer } from "./slises/profileSlice"
import { eventsReducer } from "./slises/eventsSlice"

export const store = configureStore({
    reducer: {
        moments: momentsReducer,
        authorization: authorizationReducer,
        search: searchReducer,
        profile: profileReducer,
        events: eventsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch