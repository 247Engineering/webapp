import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ProductState } from '../../../types'
import request from '../../../helpers/request'
import { isRejectedAction, isPendingAction, isFulfilledAction } from '../utils'

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
  viewedProduct: null,
  searchResult: [],
  loading: false,
  productStamp: null,
}

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    return await request({
      url: `/product/get-products`,
      method: 'get',
      user: 'distributor',
    })
  },
)

export const fetchWarehouseProducts = createAsyncThunk(
  'product/fetchWarehouseProducts',
  async (warehouse: string) => {
    return await request({
      url: `/warehouse/inventory/${warehouse}`,
      method: 'get',
      user: 'distributor',
    })
  },
)

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    return await request({
      url: '/product/get-products',
      method: 'get',
      user: 'retailer',
    })
  },
)

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (id: string) => {
    return await request({
      url: `/product/get-product/${id}`,
      method: 'get',
      user: 'distributor',
    })
  },
)

export const generateSku = createAsyncThunk('product/generateSku', async () => {
  return await request({
    url: '/product/generate-sku',
    method: 'get',
    user: 'distributor',
  })
})

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    return await request({
      url: '/product/categories',
      method: 'get',
      user: 'distributor',
    })
  },
)

export const fetchSubCategories = createAsyncThunk(
  'product/fetchSubCategories',
  async () => {
    return await request({
      url: '/product/sub-categories',
      method: 'get',
      user: 'distributor',
    })
  },
)

export const fetchManufacturers = createAsyncThunk(
  'product/fetchManufacturers',
  async () => {
    return await request({
      url: '/product/manufacturers',
      method: 'get',
      user: 'distributor',
    })
  },
)

export const searchProducts = createAsyncThunk(
  'product/searchProducts',
  async (product: string) => {
    return await request({
      url: `/product/search-product/${product}`,
      method: 'get',
      user: 'distributor',
    })
  },
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (body: {
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
    warehouse_id: string
  }) => {
    return await request({
      url: '/product/add',
      method: 'post',
      body,
      user: 'distributor',
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
    clearViewedProduct: (state) => {
      state.viewedProduct = null
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
          case 'product/fetchWarehouseProducts/fulfilled':
            state.products = action.payload.data
            break
          case 'product/fetchAllProducts/fulfilled':
            state.products = action.payload.data
            break
          case 'product/fetchSingleProduct/fulfilled':
            state.viewedProduct = action.payload.data
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

export const {
  reset,
  clearSearchResult,
  clearViewedProduct,
} = productSlice.actions

export default productSlice.reducer
