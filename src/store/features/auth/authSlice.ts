import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { AuthState, UserType } from '../../../types'
import request from '../../../helpers/request'
import { isRejectedAction, isPendingAction, isFulfilledAction } from '../utils'

const initialState: AuthState = {
  firstName: null,
  lastName: null,
  type: null,
  id: null,
  phone: null,
  loading: false,
  resetPasswordStamp: null,
  businessName: null,
}

export const signup = createAsyncThunk(
  'auth/signup',
  async (body: {
    email: string
    password: string
    fname: string
    lname: string
    type?: UserType
  }) => {
    return await request({
      url: '/auth/signup',
      method: 'post',
      body,
    })
  },
)

export const retailerSignup = createAsyncThunk(
  'auth/retailerSignup',
  async (body: { phone: string; password: string }) => {
    return await request({
      url: '/auth/register',
      method: 'post',
      body,
      user: 'retailer',
    })
  },
)

export const createWarehouseUser = createAsyncThunk(
  'auth/createWarehouseUser',
  async (body: {
    token: string
    password: string
    fname: string
    lname: string
  }) => {
    return await request({
      url: '/warehouse/create-user',
      method: 'post',
      body,
    })
  },
)

export const signin = createAsyncThunk(
  'auth/signin',
  async (body: {
    phone?: string
    email?: string
    password: string
    type?: UserType
  }) => {
    return await request({
      url: '/auth/login',
      method: 'post',
      body,
      user: body.phone ? 'retailer' : 'distributor',
    })
  },
)

export const validateOtp = createAsyncThunk(
  'auth/validateOtp',
  async (body: { phone: string; otp: string }) => {
    return await request({
      url: '/auth/validate-otp',
      method: 'post',
      body,
      user: 'retailer',
    })
  },
)

export const requestPasswordReset = createAsyncThunk(
  'auth/resetPassword',
  async (body: { email: string }) => {
    return await request({
      url: '/auth/reset',
      method: 'put',
      body,
    })
  },
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (body: { token: string; password: string }) => {
    return await request({
      url: '/auth/change-password',
      method: 'put',
      body,
    })
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    passwordStampReset: (state) => {
      state.resetPasswordStamp = null
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPendingAction('auth'), (state, action) => {
        state.loading = true
      })
      .addMatcher(isRejectedAction('auth'), (state, action) => {
        state.loading = false
      })
      .addMatcher(isFulfilledAction('auth'), (state, action) => {
        switch (action.type) {
          case 'auth/signin/fulfilled':
            state.firstName = action.payload.fname
            state.lastName = action.payload.lname
            state.id = action.payload.user_id
            state.type = action.meta.arg.type
            state.businessName = action.payload.business_name

            localStorage.setItem(
              'tokens',
              JSON.stringify(action.payload.tokens),
            )
            break
          case 'auth/signup/fulfilled':
            state.firstName = action.meta.arg.fname
            state.lastName = action.meta.arg.lname
            state.id = action.payload.user_id
            state.type = action.meta.arg.type

            localStorage.setItem(
              'tokens',
              JSON.stringify(action.payload.tokens),
            )
            break
          case 'auth/validateOtp/fulfilled':
            state.id = action.payload.user_id
            break
          case 'auth/retailerSignup/fulfilled':
            state.resetPasswordStamp = new Date().getTime()
            state.phone = action.meta.arg.phone

            localStorage.setItem(
              'tokens',
              JSON.stringify(action.payload.tokens),
            )
            break
          case 'auth/resetPassword/fulfilled':
          case 'auth/requestPasswordReset/fulfilled':
          case 'auth/createWarehouseUser/fulfilled':
            state.resetPasswordStamp = new Date().getTime()
            break
        }

        state.loading = false
      })
  },
})

export const { logout, passwordStampReset } = authSlice.actions

export default authSlice.reducer
