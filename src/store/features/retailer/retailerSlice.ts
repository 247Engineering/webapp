import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { RetailerState } from '../../../types'
import request from '../../../helpers/request'
import { isRejectedAction, isPendingAction, isFulfilledAction } from '../utils'
import { RootState } from '../..'

const initialState: RetailerState = {
  retailerStamp: null,
  loading: false,
}

export const addBusinessInfo = createAsyncThunk(
  'retailer/addBusinessInfo',
  async (
    body: {
      fname: string
      lname: string
      email: string
      business_name: string
      address: string
    },
    { getState },
  ) => {
    const {
      auth: { id },
    } = getState() as RootState

    return await request({
      url: '/auth/complete-signup',
      method: 'post',
      body: {
        user_id: id,
        ...body,
      },
      user: 'retailer',
    })
  },
)

export const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {
    reset: () => initialState,
    clearRetailerStamp: (state) => {
      state.retailerStamp = null
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPendingAction('retailer'), (state, action) => {
        state.loading = true
      })
      .addMatcher(isRejectedAction('retailer'), (state, action) => {
        state.loading = false
      })
      .addMatcher(isFulfilledAction('retailer'), (state, action) => {
        switch (action.type) {
          case 'retailer/addBusinessInfo/fulfilled':
            state.retailerStamp = new Date().getTime()
            break
        }

        state.loading = false
      })
  },
})

export const { reset, clearRetailerStamp } = retailerSlice.actions

export default retailerSlice.reducer
