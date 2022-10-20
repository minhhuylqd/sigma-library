import axios from 'axios'

import { RootState } from 'redux/store';
import { Book, Author, User, BorrowedHistory } from 'utils/types'
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'

import { BACKEND_URL } from 'utils/configs'

export interface AdminState {
  books: {
    entities: {
      [bookId: string]: Book
    }
    status: string
  }
  authors: {
    entities: {
      [authorId: string]: Author
    }
    status: string
  }
  users: {
    entities: {
      [userId: string]: User
    }
    status: string
  }
  borrower: {
    entities: {
      [borrowerId: string]: BorrowedHistory
    }
    status: string
  }
}

const initialState: AdminState = {
  books: {
    entities: {},
    status: 'idle'
  },
  authors: {
    entities: {},
    status: 'idle'
  },
  users: {
    entities: {},
    status: 'idle'
  },
  borrower: {
    entities: {},
    status: 'idle'
  }
}

// REGION -- Thunk Function
export const fetchAllBooksThunk = createAsyncThunk(
  'admin/books/fetchAllBooks',
  async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/books`)
      return data
    } catch (error) {
      return console.log(error)
    }
  }
)

export const fetchAllAuthorsThunk = createAsyncThunk(
  'admin/authors/fetchAllAuthors',
  async () => {
    try {
      const {data} = await axios.get(`${BACKEND_URL}/authors`)
      return data
    } catch (error) {
      return console.log(error)
    }
  }
)

export const fetchAllUsersThunk = createAsyncThunk(
  'admin/users/fetchAllUsers',
  async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        const response = await axios.get(`${BACKEND_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.status === 200 && response.data) {
          return response.data
        }
      }
      return []
    } catch (error) {
      throw error
    }
  }
)

export const fetchAllBorrowerThunk = createAsyncThunk(
  'admin/borrower/fetchAllBorrower',
  async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        const response = await axios.get(
          `${BACKEND_URL}/borrowers`,
          {headers: {
            Authorization: `Bearer ${token}`,
          }}
        )
        if (response.status === 200 && response.data) {
          return response.data
        }
      }
      return []
    }
    catch (error) {
      throw error
    }
  }
) 
// ENDREGION -- Thunk Function

// REGION -- AdminSlice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooksThunk.pending, (state: AdminState) => {
        state.books.status = 'loading'
      })
      .addCase(fetchAllBooksThunk.fulfilled, (state: AdminState, action) => {
        const data = action.payload
        data.forEach((book: Book) => {
          state.books.entities = {
            ...state.books.entities,
            [book._id]: book,
          }
        })
        state.books.status = 'idle'
      })
      .addCase(fetchAllAuthorsThunk.pending, (state: AdminState) => {
        state.authors.status = 'loading'
      })
      .addCase(fetchAllAuthorsThunk.fulfilled, (state: AdminState, action) => {
        const data = action.payload
        data.forEach((author: Author) => {
          state.authors.entities = {
            ...state.authors.entities,
            [author._id]: author,
          }
        })
        state.authors.status = 'idle'
      })
      .addCase(fetchAllUsersThunk.pending, (state: AdminState) => {
        state.users.status = 'loading'
      })
      .addCase(fetchAllUsersThunk.fulfilled, (state: AdminState, action) => {
        const data = action.payload
        data.forEach((user: User) => {
          state.users.entities = {
            ...state.users.entities,
            [user._id]: user,
          }
        })
        state.users.status = 'idle'
      })
      .addCase(fetchAllBorrowerThunk.pending, (state: AdminState) => {
        state.borrower.status = 'loading'
      })
      .addCase(fetchAllBorrowerThunk.fulfilled, (state: AdminState, action) => {
        const data = action.payload
        data.forEach((borrower: BorrowedHistory) => {
          state.borrower.entities = {
            ...state.borrower.entities,
            [borrower._id]: borrower,
          }
        })
        state.borrower.status = 'idle'
      })
  }
})

export default adminSlice.reducer
// ENDREGION -- AdminSlice

// REGION -- Selectors
export const adminSelectBookState = (state: RootState) => state.admin.books

export const adminSelectBookEntities = (state: RootState) => state.admin.books.entities

export const adminSelectBookIds = createSelector(
  adminSelectBookEntities,
  (bookEntities) => Object.keys(bookEntities)
)

export const adminSelectBookById = (state: RootState, bookId: string) => adminSelectBookEntities(state)[bookId]


export const adminSelectAuthorState = (state: RootState) => state.admin.authors

export const adminSelectAuthorEntities = (state: RootState) => state.admin.authors.entities

export const adminSelectAuthorIds = createSelector(
  adminSelectAuthorEntities,
  (authorEntities) => Object.keys(authorEntities)
)

export const adminSelectAuthorById = (state: RootState, authorId: string) => adminSelectAuthorEntities(state)[authorId]


export const adminSelectUserState = (state: RootState) => state.admin.users

export const adminSelectUserEntities = (state: RootState) => state.admin.users.entities

export const adminSelectUserIds = createSelector(
  adminSelectUserEntities,
  (userEntities) => Object.keys(userEntities)
)

export const adminSelectUserById = (state: RootState, userId: string) => adminSelectUserEntities(state)[userId]


export const adminSelectBorrowerEntities = (state: RootState) => state.admin.borrower.entities
// ENDREGION -- Selectors