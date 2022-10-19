import { RootState } from 'redux/store';
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'

import { Author } from 'utils/types'
import { BACKEND_URL } from 'utils/configs'

export interface AuthorState {
  entities: {
    [authorId: string]: Author
  }
  status: string
}

const initialState: AuthorState = {
  entities: {},
  status: 'idle'
}

// REGION -- Thunk function
export const fetchAllAuthorsThunk = createAsyncThunk(
  'authors/fetchAllAuthors',
  async () => {
    try {
      const {data} = await axios.get(`${BACKEND_URL}/authors`)
      return data
    } catch (error) {
      return console.log(error)
    }
  }
)
// ENDREGION -- Thunk function


// REGION -- AuthorsSlice
const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAuthorsThunk.pending, (state: AuthorState, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAllAuthorsThunk.fulfilled, (state: AuthorState, action) => {
        let data = action.payload
        data.forEach((author: Author) => {
          state.entities = {
            ...state.entities,
            [author._id]: author,
          }
        })
        state.status = 'idle'
      })
  },
})

export default authorsSlice.reducer
// ENDREGION -- AuthorsSlice

// REGION -- Selectors
export const selectAuthorsEntities = (state: RootState) => state.authors.entities

export const selectAuthorById = (state: RootState, authorId: string) => 
  selectAuthorsEntities(state)[authorId]

export const selectAllAuthorIds = createSelector(
  (state: RootState) => state.authors.entities,
  (authors) => Object.keys(authors)
)
// ENDREGION -- Selectors