import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './features/auth/authSlice'
import distributorReducer from './features/distributor/distributorSlice'
import productReducer from './features/product/productSlice'
import retailerReducer from './features/retailer/retailerSlice'

const reducer = combineReducers({
  auth: authReducer,
  distributor: distributorReducer,
  product: productReducer,
  retailer: retailerReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
