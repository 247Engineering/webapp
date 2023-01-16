export const DISTRIBUTOR = {
  SIGNUP: "/distributor/signup",
  SIGNIN: "/distributor/signin",
  FORGOT_PASSWORD: "/distributor/forgot-password",
  VERIFY_MAIL: "/distributor/VERIFY-MAIL",
  ACCOUNT_SETUP: "/distributor/account-setup",
  DASHBOARD: "/distributor/dashboard",
  BUSINESS_OWNER: "/distributor/business-owner",
  BUSINESS_OWNER_REVIEW: "/distributor/business-owner/review",
  BUSINESS_OWNER_FORM: "/distributor/business-owner/form",
  BUSINESS_INFO_FORM: "/distributor/business-info/form",
  WAREHOUSE_SIGNUP: "/distributor/create-warehouse-manager",
  WAREHOUSE_LOGIN: "/distributor/warehouse-manager-login",
  WAREHOUSES: "/distributor/warehouses",
  WAREHOUSE_FORM: "/distributor/warehouses/form",
  WAREHOUSE_PRODUCTS: "/distributor/warehouses/:warehouse/products",
  WAREHOUSE_PRODUCTS_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/products`,
  WAREHOUSE_PRODUCT_FORM: "/distributor/warehouses/:warehouse/products/form",
  WAREHOUSE_PRODUCT_FORM_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/products/form`,
  WAREHOUSE_DETAILS: "/distributor/warehouses/:warehouse",
  WAREHOUSE_DETAILS_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}`,
  WAREHOUSE_ORDERS: "/distributor/warehouses/orders",
  WAREHOUSE_ORDER: "/distributor/warehouses/:warehouse/orders/:order",
  WAREHOUSE_ORDER_FOR: (warehouse: string, order: string) =>
    `/distributor/warehouses/${warehouse}/orders/${order}`,
  WAREHOUSE_ORDER_CONFIRM:
    "/distributor/warehouses/:warehouse/orders/:order/confirm",
  WAREHOUSE_ORDER_CONFIRM_FOR: (warehouse: string, order: string) =>
    `/distributor/warehouses/${warehouse}/orders/${order}/confirm`,
  WAREHOUSE_CHANGE_MANAGER: "/distributor/warehouses/:warehouse/change-manager",
  WAREHOUSE_CHANGE_MANAGER_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/change-manager`,
  WAREHOUSE_EDIT: "/distributor/warehouses/:warehouse/edit",
  WAREHOUSE_EDIT_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/edit`,
};

export const WAREHOUSE = {
  DASHBOARD: "/distributor/dashboard",
  SIGNUP: "/distributor/warehouse-manager-login",
};

export const RETAILER = {
  SIGNUP: "/retailer/signup",
  SIGNIN: "/retailer/signin",
  FORGOT_PASSWORD: "/retailer/forgot-password",
  VERIFY_OTP: "/retailer/verify-otp",
  BUSINESS_INFO_FORM: "/retailer/business-info/form",
  DASHBOARD: "/retailer/store",
  STORE_PRODUCT: "/retailer/store/:product",
  STORE_PRODUCT_FOR: (product: string) => `/retailer/store/${product}`,
  CART: "/retailer/cart",
  CHECKOUT: "/retailer/checkout",
  ORDERS: "/retailer/orders",
  PAYMENT: "/retailer/orders/:order/payment",
  PAYMENT_FOR: (order: string) => `/retailer/orders/${order}/payment`,
  ORDER_NOTIFICATION: "/retailer/orders/:order/notification",
  ORDER_NOTIFICATION_FOR: (order: string) =>
    `/retailer/orders/${order}/notification`,
  ORDER_STATUS: "/retailer/orders/:order/status",
  ORDER_STATUS_FOR: (order: string) => `/retailer/orders/${order}/status`,
};

// export const RIDER = {}

export const AUTH = {
  DASHBOARD: "/auth/account-select",
  ACCOUNT_SELECT: "/auth/account-select",
  RESET_PASSWORD: "/auth/reset-password",
  SIGNUP: "/retailer/signin",
};
