import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ProductState } from '../../../types'
import request from '../../../helpers/request'
import { isRejectedAction, isPendingAction, isFulfilledAction } from '../utils'
import { RootState } from '../..'

const initialState: ProductState = {
  name: null,
  description: null,
  price: 0,
  discountedPrice: 0,
  costPerItem: 0,
  sku: '',
  trackQuantity: false,
  quantity: 0,
  weightValue: 0,
  weightUnit: '0',
  category: null,
  subCategory: null,
  manufacturer: null,
  categories: [],
  subCategories: [],
  manufacturers: [],
  images: [],
  products: [],
  searchResult: [],
  loading: false,
  productStamp: null,
}

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { getState }) => {
    const {
      auth: { id },
    } = getState() as RootState

    return await request({
      url: `/product/get-products/${id}`,
      method: 'get',
    })
  },
)

export const generateSku = createAsyncThunk('product/generateSku', async () => {
  return await request({
    url: '/product/generate-sku',
    method: 'get',
  })
})

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    return await request({
      url: '/product/categories',
      method: 'get',
    })
  },
)

export const fetchSubCategories = createAsyncThunk(
  'product/fetchSubCategories',
  async () => {
    return await request({
      url: '/product/sub-categories',
      method: 'get',
    })
  },
)

export const fetchManufacturers = createAsyncThunk(
  'product/fetchManufacturers',
  async () => {
    return await request({
      url: '/product/manufacturers',
      method: 'get',
    })
  },
)

export const searchProducts = createAsyncThunk(
  'product/searchProducts',
  async (product: string) => {
    return await request({
      url: `/product/search-product/${product}`,
      method: 'get',
    })
  },
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (
    body: {
      name: string
      description: string
      price: number
      discount_price: number
      cost_per_item: number
      sku: string
      quantity: number
      weight: { type: number; value: number }
      sub_category: string
      category: string
      manufacturer: string
      images: string[]
    },
    { getState },
  ) => {
    const {
      auth: { id },
    } = getState() as RootState

    return await request({
      url: '/product/add',
      method: 'post',
      body: {
        user_id: id,
        ...body,
      },
    })
  },
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: () => initialState,
    clearSearchResult: (state) => {
      state.searchResult = []
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPendingAction('product'), (state, action) => {
        state.loading = true
      })
      .addMatcher(isRejectedAction('product'), (state, action) => {
        state.loading = false
      })
      .addMatcher(isFulfilledAction('product'), (state, action) => {
        switch (action.type) {
          case 'product/searchProducts/fulfilled':
            state.searchResult = action.payload.products
            break
          case 'product/fetchProducts/fulfilled':
            state.products = action.payload.products
            break
          case 'product/generateSku/fulfilled':
            state.sku = action.payload.sku
            break
          case 'product/fetchCategories/fulfilled':
            state.categories = action.payload.categories
            break
          case 'product/fetchSubCategories/fulfilled':
            state.subCategories = action.payload.subCategories
            break
          case 'product/fetchManufacturers/fulfilled':
            state.manufacturers = action.payload.manufacturers
            break
          case 'product/addProduct/fulfilled':
            state.productStamp = new Date().getTime()
            break
        }

        state.loading = false
      })
  },
})

export const { reset, clearSearchResult } = productSlice.actions

export default productSlice.reducer
