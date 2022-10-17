import {createSlice} from '@reduxjs/toolkit'

export interface FiltersState {
  book: {
    searchQuery: string
    filterOptions: {
      isAvailable: boolean
    }
  }
}

const initialState: FiltersState = {
  book: {
    searchQuery: '',
    filterOptions: {
      isAvailable: false
    }
  }
}

// REGION -- FiltersSlice
const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateBookSearch(state: FiltersState, action) {
      state.book.searchQuery = action.payload
    },
    updateBookAvailableOption(state: FiltersState, action) {
      state.book.searchQuery = action.payload
    }
  }
})

export const {updateBookSearch, updateBookAvailableOption} = filtersSlice.actions

export default filtersSlice.reducer
// ENDREGION -- FiltersSlice