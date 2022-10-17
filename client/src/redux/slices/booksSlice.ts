import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from './../store'
import { Book } from './../../utils/types'
import { BACKEND_URL } from 'utils/configs'

export interface BookState {
  entitites: {
    [bookId: string]: Book
  }
  status: string
}

const initialState: BookState = {
  entitites: {},
  status: 'idle',
}

// REGION -- Thunk function
export const fetchAllBooks = createAsyncThunk(
  'books/fetchAllBooks',
  async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/books`)
      return data
    } catch (error) {
      return console.log(error)
    }
  }
)
// ENDREGION -- Thunk function

// REGION -- BooksSlices
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state: BookState, action) => {
        state.status = 'loading'
      })
      .addCase(fetchAllBooks.fulfilled, (state: BookState, action) => {
        let data = action.payload
        data.forEach((book: Book) => {
          state.entitites = {
            ...state.entitites,
            [book._id]: book,
          }
        })
        state.status = 'idle'
      })
  },
})

export default booksSlice.reducer
// ENDREGION -- BooksSlices

// REGION -- Selectors
export const selectAllBooks = (state: RootState) => state.books

export const selectBooksEntities = (state: RootState) => state.books.entitites

export const selectBookById = (state: RootState, bookId: string) =>
  selectBooksEntities(state)[bookId]

export const selectAllBookIds = createSelector(
  (state: RootState) => state.books.entitites,
  (books) => Object.keys(books)
)

export const selectFilteredBookIds = createSelector(
  selectAllBooks,
  (state: RootState) => state.filters.book,
  (booksState, filtersState) => {
    const {searchQuery, filterOptions} = filtersState

    const filteredByTitle = 
      Object.values(booksState.entitites)
      .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((book) => book._id)

    const filteredByIsbn =
      Object.values(booksState.entitites)
      .filter((book) => book.isbn.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((book) => book._id)

    const filteredByAuthors =
      Object.values(booksState.entitites)
      .filter((book) => book.authors)
      .filter((book) => book.authorNames.find((author) => author.toLowerCase().includes(searchQuery.toLowerCase())))
      .map((book) => book._id)

    return Array.from(new Set([...filteredByTitle, ...filteredByIsbn, ...filteredByAuthors]))
  }
)

// ENDREGION -- Selectors
