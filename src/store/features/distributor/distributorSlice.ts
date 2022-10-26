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
    const data = await request({
      url: '/onboarding/signup',
      method: 'post',
      body,
    })
    console.log({ data })
  },
)

export const distributorSlice = createSlice({
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
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false
      })
  },
})

export const { logout } = distributorSlice.actions

export default distributorSlice.reducer
