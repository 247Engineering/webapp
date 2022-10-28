import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { AuthState } from '../../../types'
import { request } from '../../../helpers/request'

const initialState: AuthState = {
  firstName: null,
  lastName: null,
  type: null,
  id: null,
  loading: false,
}

export const signup = createAsyncThunk(
  'signup',
  async (body: { email: string; password: string }) => {
    return await request({
      url: '/onboarding/signup',
      method: 'post',
      body,
    })
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false
        state.id = payload.userId
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
