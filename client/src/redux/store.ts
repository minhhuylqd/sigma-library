import { configureStore } from '@reduxjs/toolkit'

import booksReducer from './slices/booksSlice'
import filtersReducer from './slices/filtersSlice'
import authReducer from './slices/authSlice'
import borrowerReducer from './slices/borrowerSlice'
import authorsReducer from './slices/authorsSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filtersReducer,
    auth: authReducer,
    borrower: borrowerReducer,
    authors: authorsReducer
  },
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
