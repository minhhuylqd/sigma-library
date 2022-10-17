import { configureStore } from '@reduxjs/toolkit'

import booksReducer from './slices/booksSlice'
import filtersReducer from './slices/filtersSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
