import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { User } from 'utils/types';
import { RootState } from 'redux/store'
import { BACKEND_URL } from 'utils/configs'

export interface AuthState {
  isLogin: boolean
  isActive: boolean
  isAdmin: boolean
  userInfo: User
  status: string
}

const initialState: AuthState = {
  isLogin: false,
  isActive: false,
  isAdmin: false,
  userInfo: {
    _id: '',
    email: '',
    displayName: '',
    status: '',
    role: ''
  },
  status: 'idle',
}

// REGION -- Thunk Function
export const fetchCredentialThunk = createAsyncThunk(
  'auth/fetchCredential',
  async () => {
    try {
      const token = localStorage.getItem('authToken')
      if (token) {
        const response = await axios.get(`${BACKEND_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.status === 200 && response.data) {
          const isActive = response.data.status === 'ACTIVE'
          const isAdmin = response.data.role === 'ADMIN'
          return {
            isLogin: true,
            isActive: isActive,
            isAdmin: isAdmin,
            userInfo: {
              _id: response.data._id,
              email: response.data.email,
              displayName: response.data.displayName,
              status: response.data.status,
              role: response.data.role,
            },
          }
        }
      }
      return {
        isLogin: false,
        isActive: false,
        isAdmin: false,
        userInfo: {
          _id: '',
          email: '',
          displayName: '',
          status: '',
          role: '',
        },
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
      state.userInfo = {
        _id: '',
        email: '',
        displayName: '',
        status: '',
        role: '',
      }
    },
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
          state.userInfo = data.userInfo
        }
        state.status = 'idle'
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
// ENDREGION -- AuthSlice

// REGION -- Selectors
export const selectAuthState = (state: RootState) => state.auth
// ENDREGION -- Selectors
