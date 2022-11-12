export const DISTRIBUTOR = {
  SIGNUP: '/distributor/signup',
  SIGNIN: '/distributor/signin',
  FORGOT_PASSWORD: '/distributor/forgot-password',
  ACCOUNT_SETUP: '/distributor/account-setup',
  DASHBOARD: '/distributor/dashboard',
  BUSINESS_OWNER: '/distributor/business-owner',
  BUSINESS_OWNER_REVIEW: '/distributor/business-owner/review',
  BUSINESS_OWNER_FORM: '/distributor/business-owner/form',
  BUSINESS_INFO_FORM: '/distributor/business-info/form',
  WAREHOUSE_SIGNUP: '/distributor/create-warehouse-manager',
  WAREHOUSE_LOGIN: '/distributor/warehouse-manager-login',
  WAREHOUSES: '/distributor/warehouses',
  WAREHOUSE_FORM: '/distributor/warehouses/form',
  WAREHOUSE_PRODUCTS: '/distributor/warehouses/:warehouse/products',
  WAREHOUSE_PRODUCTS_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/products`,
  WAREHOUSE_PRODUCT_FORM: '/distributor/warehouses/:warehouse/products/form',
  WAREHOUSE_PRODUCT_FORM_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/products/form`,
}

export const RETAILER = {
  SIGNUP: '/retailer/signup',
  SIGNIN: '/retailer/signin',
  FORGOT_PASSWORD: '/retailer/forgot-password',
  VERIFY_OTP: '/retailer/verify-otp',
  BUSINESS_INFO_FORM: '/retailer/business-info/form',
  DASHBOARD: '/retailer/shop',
}

export const RIDER = {}

export const AUTH = {
  ACCOUNT_SELECT: 'auth/account-select',
  RESET_PASSWORD: 'auth/reset-password',
}
