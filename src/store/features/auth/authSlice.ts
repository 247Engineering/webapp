import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { AuthState } from '../../../types'
import { request } from '../../../helpers/request'
import { isRejectedAction, isPendingAction, isFulfilledAction } from '../utils'

const initialState: AuthState = {
  firstName: null,
  lastName: null,
  type: null,
  id: null,
  loading: false,
}

export const signup = createAsyncThunk(
  'signup',
  async (body: {
    email: string
    password: string
    fname: string
    lname: string
  }) => {
    return await request({
      url: '/onboarding/signup',
      method: 'post',
      body,
    })
  },
)

export const signin = createAsyncThunk(
  'signin',
  async (body: { email: string; password: string }) => {
    return await request({
      url: '/auth/login',
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
      .addMatcher(isPendingAction, (state, action) => {
        state.loading = true
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        switch (action.type) {
          case 'signin/fulfilled':
            state.firstName = action.payload.fname
            state.lastName = action.payload.lname
            break
          case 'signup/fulfilled':
            state.firstName = action.meta.arg.fname
            state.lastName = action.meta.arg.lname
            break
        }

        state.loading = false
        state.id = action.payload.userId
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
