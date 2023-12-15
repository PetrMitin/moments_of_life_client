import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISearchResults, SearchState } from "../../utils/interfaces/sliceInterfaces/searchSliceInterfaces";
import searchActions from "../../actions/searchActions";
import { RootState } from "../store";

const initialState: SearchState = {
    users: [],
    moments: [],
    status: 'idle'
}

export const selectSearchMomentsResults = (state: RootState) => state.search.moments

export const selectSearchUsersResults = (state: RootState) => state.search.users

export const selectSearchStatus = (state: RootState) => state.search.status

export const search = createAsyncThunk(
    'search/search',
    async (query: string): Promise<ISearchResults> => {
        return (await searchActions.searchByTextQuery(query))
    }
)

const SearchSlice = createSlice(
    {
        name: 'search',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(search.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(search.fulfilled, (state, action) => {
                state.moments = action.payload.moments
                state.users = action.payload.users
                state.status = 'idle'
            })
            .addCase(search.rejected, (state, action) => {
                console.log(action.error)
                state.moments = []
                state.users = []
                state.status = 'error'
            })
        }
    }
)

export const searchReducer = SearchSlice.reducer