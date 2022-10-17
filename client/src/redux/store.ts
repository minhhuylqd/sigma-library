import { configureStore } from '@reduxjs/toolkit'

import booksReducer from './slices/booksSlice'
import filtersReducer from './slices/filtersSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filtersReducer
  },
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
