import { RootState } from 'redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BorrowedHistory } from 'utils/types'
import axios from 'axios'

import { BACKEND_URL } from './../../utils/configs';

export interface BorrowerState {
  borrowedHistory: BorrowedHistory[]
  status: string
}

const initialState: BorrowerState = {
  borrowedHistory: [],
  status: 'idle'
}

// REGION -- Thunk Function
export const fetchBorrowedHistoryThunk = createAsyncThunk(
  'borrower/fetchHistory',
  async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        const response = await axios.get(
          `${BACKEND_URL}/borrowers/me`,
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

// REGION -- BorrowerSlice
const borrowerSlice = createSlice({
  name: 'borrower',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrowedHistoryThunk.pending, (state: BorrowerState) => {
        state.status = 'loading'
      })
      .addCase(fetchBorrowedHistoryThunk.fulfilled, (state: BorrowerState, action) => {
        let data = action.payload
        if (data) {
          state.borrowedHistory = data
        }
        state.status = 'idle'
      })
  }
})

export default borrowerSlice.reducer
// ENDREGION -- BorrowerSlice

// REGION -- Selectors
export const selectBorrowedHistory = (state: RootState) => state.borrower.borrowedHistory
// ENDREGION -- Selectors