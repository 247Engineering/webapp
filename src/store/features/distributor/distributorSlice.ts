import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { DistributorState, Address, Owner } from '../../../types'
import request from '../../../helpers/request'
import { RootState } from '../..'
// import { signin } from '../auth'
import { isRejectedAction, isPendingAction, isFulfilledAction } from '../utils'

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
  warehouseStamp: null,
  warehouses: [],
  warehouse: null,
  order: null,
}

export const submitDistributor = createAsyncThunk(
  'distributor/submitDistributor',
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
      user: 'distributor',
    })
  },
)

export const addWarehouse = createAsyncThunk(
  'distributor/addWarehouse',
  async (
    body: {
      name: string
      location: Address
      email: string
    },
    { getState },
  ) => {
    const {
      auth: { id },
    } = getState() as RootState

    return await request({
      url: '/warehouse/add',
      method: 'post',
      body: {
        distributor_id: id,
        ...body,
      },
      user: 'distributor',
    })
  },
)

export const fetchWarehouses = createAsyncThunk(
  'distributor/fetchWarehouses',
  async () => {
    return await request({
      url: `/warehouse/get-warehouses`,
      method: 'get',
      user: 'distributor',
    })
  },
)

export const fetchWarehouse = createAsyncThunk(
  'distributor/fetchWarehouse',
  async (warehouse: string) => {

    return await request({
      url: `/warehouse/single/${warehouse}`,
      method: 'get',
      user: 'distributor',
    })
  },
)

export const fetchWarehouseOrders = createAsyncThunk(
  'distributor/fetchWarehouseOrders',
  async (warehouse: string) => {
    return await request({
      url: `/warehouse/orders/${warehouse}`,
      method: 'get',
      user: 'distributor',
    })
  },
)

export const fetchWarehouseOrder = createAsyncThunk(
  'distributor/fetchWarehouseOrder',
  async ({ order, warehouse }: { order: string; warehouse: string }) => {
    return await request({
      url: `/warehouse/order/${order}/${warehouse}`,
      method: 'get',
      user: 'distributor',
    })
  },
)

export const updateWarehouseOrder = createAsyncThunk(
  'distributor/updateWarehouseOrder',
  async ({
    order,
    warehouse,
    status: order_status,
  }: {
    order: string
    warehouse: string
    status: string
  }) => {
    return await request({
      url: `/warehouse/order/${order}/${warehouse}`,
      method: 'put',
      body: { order_status },
      user: 'distributor',
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
    resetWarehouseStamp: (state) => {
      state.warehouseStamp = null
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(signin.fulfilled, (state, { payload: { step } }) => {
      //   if (step > 0) state.stepsCompleted = 3
      // })
      .addMatcher(isPendingAction('distributor'), (state, action) => {
        state.loading = true
      })
      .addMatcher(isRejectedAction('distributor'), (state, action) => {
        state.loading = false
      })
      .addMatcher(isFulfilledAction('distributor'), (state, action) => {
        switch (action.type) {
          case 'distributor/submitDistributor/fulfilled':
            state.stepsCompleted = 3
            break
          case 'distributor/addWarehouse/fulfilled':
            state.warehouseStamp = action.payload.warehouse_id
            break
          case 'distributor/fetchWarehouses/fulfilled':
            state.warehouses = action.payload.data
            break
          case 'distributor/fetchWarehouse/fulfilled':
            state.warehouse = action.payload.data
            break
          case 'distributor/fetchWarehouseOrder/fulfilled':
            state.order = action.payload.data
            break
          case 'distributor/fetchWarehouseOrders/fulfilled':
            state.orders = action.payload.data
            break
        }

        state.loading = false
      })
  },
})

export const {
  completeStep,
  updateDistributor,
  addOwner,
  removeOwner,
  resetWarehouseStamp,
} = distributorSlice.actions

export default distributorSlice.reducer
