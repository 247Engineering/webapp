export const DISTRIBUTOR = {
  SIGNUP: "/distributor/signup",
  SIGNIN: "/distributor/signin",
  FORGOT_PASSWORD: "/distributor/forgot-password",
  VERIFY_MAIL: "/distributor/verify-mail",
  ACCOUNT_SETUP: "/distributor/account-setup",
  DASHBOARD: "/distributor/dashboard",
  BUSINESS_OWNER: "/distributor/business-owner",
  BUSINESS_OWNER_REVIEW: "/distributor/business-owner/review",
  BUSINESS_OWNER_FORM: "/distributor/business-owner/form",
  BUSINESS_INFO_FORM: "/distributor/business-info/form",
  COUPONS: "/distributor/coupons",
  COUPON_FORM: "/distributor/coupons/form",
  WAREHOUSE_SIGNUP: "/distributor/create-warehouse-manager",
  WAREHOUSE_LOGIN: "/distributor/warehouse-manager-login",
  WAREHOUSES: "/distributor/warehouses",
  WAREHOUSE_FORM: "/distributor/warehouses/form",
  WAREHOUSE_PRODUCTS: "/distributor/warehouses/:warehouse/products",
  WAREHOUSE_PRODUCTS_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/products`,
  WAREHOUSE_SALE: "/distributor/warehouses/:warehouse/create-order",
  WAREHOUSE_SALE_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/create-order`,
  WAREHOUSE_RETAILER_INFO: "/distributor/warehouses/:warehouse/retailer-info",
  WAREHOUSE_RETAILER_INFO_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/retailer-info`,
  WAREHOUSE_STORE: "/distributor/warehouses/:warehouse/store",
  WAREHOUSE_STORE_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/store`,
  WAREHOUSE_STORE_PRODUCT: "/distributor/warehouses/:warehouse/store/:product",
  WAREHOUSE_STORE_PRODUCT_FOR: (warehouse: string, product: string) =>
    `/distributor/warehouses/${warehouse}/store/${product}`,
  WAREHOUSE_CART: "/distributor/warehouses/:warehouse/cart",
  WAREHOUSE_CART_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/cart`,
  WAREHOUSE_CHECKOUT: "/distributor/warehouses/:warehouse/checkout",
  WAREHOUSE_CHECKOUT_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/checkout`,
  WAREHOUSE_PAYMENT: "/distributor/warehouses/:warehouse/orders/:order/payment",
  WAREHOUSE_PAYMENT_FOR: (warehouse: string, order: string) =>
    `/distributor/warehouses/${warehouse}/orders/${order}/payment`,
  WAREHOUSE_TRANSFER_PAYMENT:
    "/distributor/warehouses/:warehouse/orders/:order/payment/transfer",
  WAREHOUSE_TRANSFER_PAYMENT_FOR: (warehouse: string, order: string) =>
    `/distributor/warehouses/${warehouse}/orders/${order}/payment/transfer`,
  ORDER_NOTIFICATION:
    "/distributor/warehouses/:warehouse/orders/:order/notification",
  ORDER_NOTIFICATION_FOR: (warehouse: string, order: string) =>
    `/distributor/warehouses/${warehouse}/orders/${order}/notification`,
  WAREHOUSE_PRODUCT_FORM: "/distributor/warehouses/:warehouse/products/form",
  WAREHOUSE_PRODUCT_FORM_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}/products/form`,
  WAREHOUSE_PRODUCT_EDIT:
    "/distributor/warehouses/:warehouse/products/:product/edit",
  WAREHOUSE_PRODUCT_EDIT_FOR: (warehouse: string, product: string) =>
    `/distributor/warehouses/${warehouse}/products/${product}/edit`,
  WAREHOUSE_DETAILS: "/distributor/warehouses/:warehouse",
  WAREHOUSE_DETAILS_FOR: (warehouse: string) =>
    `/distributor/warehouses/${warehouse}`,
  WAREHOUSE_ORDERS: "/distributor/warehouses/orders",
  RETAILER_ORDERS: "/distributor/warehouses/:warehouse/retailers/:retailer/orders",
  RETAILER_ORDERS_FOR: (warehouse: string, retailer: string) =>
    `/distributor/warehouses/${warehouse}/retailers/${retailer}/orders`,
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
  SIGNIN: "/distributor/warehouse-manager-login",
  SIGNUP: "/auth/account-select",
  FORGOT_PASSWORD: "/warehouse/forgot-password",
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
  TRANSFER_PAYMENT: "/retailer/orders/:order/payment/transfer",
  TRANSFER_PAYMENT_FOR: (order: string) =>
    `/retailer/orders/${order}/payment/transfer`,
  ORDER_NOTIFICATION: "/retailer/orders/:order/notification",
  ORDER_NOTIFICATION_FOR: (order: string) =>
    `/retailer/orders/${order}/notification`,
  ORDER_STATUS: "/retailer/orders/:order/status",
  ORDER_STATUS_FOR: (order: string) => `/retailer/orders/${order}/status`,
};

export const LOGISTICS = {
  SIGNUP: "/logistics/signup",
  SIGNIN: "/logistics/signin",
  FORGOT_PASSWORD: "/logistics/forgot-password",
  VERIFY_OTP: "/logistics/verify-otp",
  ACCOUNT_SETUP: "/logistics/account-setup",
  BUSINESS_INFO_FORM: "/logistics/vehicle-info/form",
  DASHBOARD: "/logistics/dashboard",
  DELIVERIES: "/logistics/deliveries",
  WALLET: "/logistics/wallet",
  TRANSFER: "/logistics/transfer",
  ADD_BANK: "/logistics/add-bank",
  ADD_PAYMENT: "/logistics/add-payment",
  ORDER_PROMPT: "/logistics/order/prompt",
  ORDER_STATUS: "/logistics/order/status",
};

export const AUTH = {
  DASHBOARD: "/auth/account-select",
  ACCOUNT_SELECT: "/auth/account-select",
  SIGNUP: "/auth/account-select",
  SIGNIN: "/auth/account-select",
  RESET_PASSWORD: "/auth/reset-password",
};
