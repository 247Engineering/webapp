import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { DistributorState, Owner } from '../../../types'
import { request } from '../../../helpers/request'
import { RootState } from '../..'
import { signin } from '../auth'

const initialState: DistributorState = {
  businessName: null,
  address: null,
  city: null,
  country: null,
  state: null,
  cac: null,
  owners: [],
  stepsCompleted: 0,
  loading: false,
}

export const submitDistributor = createAsyncThunk(
  'submitDistributor',
  async (_, { getState }) => {
    const {
      auth: { id },
      distributor,
    } = getState() as RootState

    await request({
      url: '/onboarding/setup',
      method: 'post',
      body: {
        user_id: id,
        business_name: distributor.businessName,
        address: distributor.address,
        city: distributor.city,
        country: distributor.country,
        state: distributor.state,
        cac: distributor.cac,
        owners: distributor.owners?.map((owner) => ({
          first_name: owner.firstName,
          last_name: owner.lastName,
          phone_number: owner.phoneNumber,
          email: owner.email,
          image: owner.idImage,
        })),
      },
    })
  },
)

export const distributorSlice = createSlice({
  name: 'distributor',
  initialState,
  reducers: {
    completeStep: (state, { payload }) => {
      state.stepsCompleted = payload
    },
    updateDistributor: (state, { payload }: { payload: DistributorState }) => {
      for (const item in payload) {
        // @ts-ignore
        state[item] = payload[item]
      }
      state.businessName = payload.businessName
    },
    addOwner: (state, { payload }: { payload: Owner }) => {
      state.owners?.push(payload)
    },
    removeOwner: (state, { payload }: { payload: string }) => {
      let owners = state.owners?.filter((owner) => owner.idImage !== payload)
      state.owners = owners
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitDistributor.pending, (state, action) => {
        state.loading = true
      })
      .addCase(submitDistributor.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(submitDistributor.fulfilled, (state, action) => {
        state.stepsCompleted = 3
        state.loading = false
      })
      .addCase(signin.fulfilled, (state, { payload: { step } }) => {
        if (step > 0) state.stepsCompleted = 3
      })
  },
})

export const {
  completeStep,
  updateDistributor,
  addOwner,
  removeOwner,
} = distributorSlice.actions

export default distributorSlice.reducer
