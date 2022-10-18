import { configureStore } from '@reduxjs/toolkit'

import booksReducer from './slices/booksSlice'
import filtersReducer from './slices/filtersSlice'
import authReducer from './slices/authSlice'
import borrowerReducer from './slices/borrowerSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filtersReducer,
    auth: authReducer,
    borrower: borrowerReducer
  },
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
