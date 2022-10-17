import { RootState } from './../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BACKEND_URL } from './../../utils/configs';

export interface AuthState {
  isLogin: boolean
  isActive: boolean
  isAdmin: boolean
  status: string
}

const initialState: AuthState = {
  isLogin: false,
  isActive: false,
  isAdmin: false,
  status: 'idle'
}

// REGION -- Thunk Function
export const fetchCredentialThunk = createAsyncThunk(
  'auth/fetchCredential',
  async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        const response = await axios.get(
          `${BACKEND_URL}/users/me`,
          {headers: {
            Authorization: `Bearer ${token}`
          }}
        )
        if (response.status === 200 && response.data) {
          const isActive = response.data.status === 'ACTIVE'
          const isAdmin = response.data.role === 'ADMIN'
          return {
            isLogin: true,
            isActive: isActive,
            isAdmin: isAdmin
          }
        }
      }
      return {
        isLogin: false,
        isActive: false,
        isAdmin: false
      }
    } catch (error) {
      throw error
    }
  }
)
// ENDREGION -- Thunk Function

// REGION -- AuthSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.isLogin = false
      state.isActive = false
      state.isAdmin = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredentialThunk.pending, (state: AuthState, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCredentialThunk.fulfilled, (state: AuthState, action) => {
        let data = action.payload
        if (data) {
          state.isLogin = data.isLogin
          state.isActive = data.isActive
          state.isAdmin = data.isAdmin
        }
        state.status = 'idle'
      })
  }
})

export const {logout} = authSlice.actions

export default authSlice.reducer
// ENDREGION -- AuthSlice

// REGION -- Selectors
export const selectAuthState = (state: RootState) => state.auth
// ENDREGION -- Selectors