import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { DistributorState, Address, Owner, CartItem } from "../../../types";
import request from "../../../helpers/request";
import { RootState } from "../..";
// import { signin } from '../auth'
import { isRejectedAction, isPendingAction, isFulfilledAction } from "../utils";

const initialState: DistributorState = {
  businessName: null,
  address: null,
  city: null,
  country: null,
  state: null,
  cac: null,
  owners: [],
  stepsCompleted: 0,
  saleStepsCompleted: 0,
  loading: false,
  warehouseStamp: null,
  warehouses: [],
  warehouse: null,
  order: null,
  cartItems: [],
  cartId: null,
  retailer: null,
  orderType: "delivery",
  orderId: null,
  accountDetails: null,
  coupons: [],
  couponAmount: 0,
  splitPayment: false,
  previousOrder: [],
  previousOrderId: null,
};

export const submitDistributor = createAsyncThunk(
  "distributor/submitDistributor",
  async (_, { getState }) => {
    const {
      auth: { id },
      distributor,
    } = getState() as RootState;

    await request({
      url: "/onboarding/setup",
      method: "post",
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
      user: "distributor",
    });
  }
);

export const addWarehouse = createAsyncThunk(
  "distributor/addWarehouse",
  async (
    body: {
      name: string;
      location: Address;
      email: string;
    },
    { getState }
  ) => {
    const {
      auth: { id },
    } = getState() as RootState;

    return await request({
      url: "/warehouse/add",
      method: "post",
      body: {
        distributor_id: id,
        ...body,
      },
      user: "distributor",
    });
  }
);

export const editWarehouse = createAsyncThunk(
  "distributor/editWarehouse",
  async (payload: { name?: string; location?: Address; warehouse: string }) => {
    const { warehouse, ...body } = payload;
    return await request({
      url: `/warehouse/edit/${warehouse}`,
      method: "put",
      body,
      user: "distributor",
    });
  }
);

export const manageWarehouse = createAsyncThunk(
  "distributor/manageWarehouse",
  async (payload: {
    wh_status?: "ENABLE" | "DISABLE" | "DELETE";
    warehouse: string;
  }) => {
    const { warehouse, ...body } = payload;
    return await request({
      url: `/warehouse/modify/${warehouse}`,
      method: "put",
      body,
      user: "distributor",
    });
  }
);

export const changeWarehouseManager = createAsyncThunk(
  "distributor/changeWarehouseManager",
  async (body: { email: string; warehouse_id: string }) => {
    return await request({
      url: `/warehouse/change-manager`,
      method: "post",
      body,
      user: "distributor",
    });
  }
);

export const fetchWarehouses = createAsyncThunk(
  "distributor/fetchWarehouses",
  async () => {
    return await request({
      url: `/warehouse/get-warehouses`,
      method: "get",
      user: "distributor",
    });
  }
);

export const fetchWarehouse = createAsyncThunk(
  "distributor/fetchWarehouse",
  async (warehouse: string) => {
    return await request({
      url: `/warehouse/single/${warehouse}`,
      method: "get",
      user: "distributor",
    });
  }
);

export const fetchWarehouseOrders = createAsyncThunk(
  "distributor/fetchWarehouseOrders",
  async (warehouses: string) => {
    return await request({
      url: `/warehouse/orders?warehouse_ids=${warehouses}`,
      method: "get",
      user: "distributor",
    });
  }
);

export const fetchWarehouseOrder = createAsyncThunk(
  "distributor/fetchWarehouseOrder",
  async ({ order, warehouse }: { order: string; warehouse: string }) => {
    return await request({
      url: `/warehouse/order/${order}/${warehouse}`,
      method: "get",
      user: "distributor",
    });
  }
);

export const fetchWarehouseRetailerOrder = createAsyncThunk(
  "distributor/fetchWarehouseRetailerOrder",
  async ({ retailer, warehouse }: { retailer: string; warehouse: string }) => {
    return await request({
      url: `/warehouse/retailer/orders/${retailer}/${warehouse}`,
      method: "get",
      user: "distributor",
    });
  }
);

export const updateWarehouseOrder = createAsyncThunk(
  "distributor/updateWarehouseOrder",
  async ({
    order,
    warehouse,
    status: order_status,
  }: {
    order: string;
    warehouse: string;
    status: string | null;
  }) => {
    return await request({
      url: `/warehouse/update-order/${order}/${warehouse}`,
      method: "put",
      body: { order_status },
      user: "distributor",
    });
  }
);

export const confirmOrderPickup = createAsyncThunk(
  "distributor/confirmOrderPickup",
  async (body: {
    order_doc_id: string;
    warehouse_id: string;
    pickup_code: string;
  }) => {
    return await request({
      url: "/warehouse/confirm-pickup",
      method: "post",
      body,
      user: "distributor",
    });
  }
);

export const createRetailer = createAsyncThunk(
  "distributor/createRetailer",
  async ({
    onSuccess,
    ...body
  }: {
    phone: string;
    fname: string;
    lname: string;
    onSuccess: () => void;
  }) => {
    return await request({
      url: "/commerce/retailer/details",
      method: "post",
      body,
      user: "distributor",
      onSuccess,
    });
  }
);

export const findRetailer = createAsyncThunk(
  "distributor/findRetailer",
  async (phone: string) => {
    return await request({
      url: `/commerce/retailer/${phone}`,
      method: "get",
      user: "distributor",
    });
  }
);

export const fetchCart = createAsyncThunk(
  "distributor/fetchCart",
  async (lastOrder: boolean, { getState }) => {
    const {
      distributor: { retailer },
    } = getState() as RootState;

    return await request({
      url: `/commerce/cart/${retailer?.retailer_id}${
        lastOrder ? "?data=last" : ""
      }`,
      method: "get",
      user: "distributor",
    });
  }
);

export const addToWarehouseCart = createAsyncThunk(
  "distributor/addToWarehouseCart",
  async (
    { cartItem, onSuccess }: { cartItem: CartItem; onSuccess: () => void },
    { getState }
  ) => {
    const {
      distributor: { cartItems, retailer },
    } = getState() as RootState;

    let itemInCart = cartItems?.find((item) => item.id === cartItem.id);

    const line_items = itemInCart
      ? cartItems?.map((item) =>
          item.id === cartItem.id
            ? { quantity: cartItem.quantity, product_id: cartItem.id }
            : { quantity: item.quantity, product_id: item.id }
        )
      : [
          ...(cartItems || []).map((item) => ({
            quantity: item.quantity,
            product_id: item.id,
          })),
          { quantity: cartItem.quantity, product_id: cartItem.id },
        ];

    return await request({
      url: "/commerce/cart",
      method: "post",
      body: { line_items, retailer_id: retailer?.retailer_id },
      user: "distributor",
      onSuccess,
    });
  }
);

export const removeFromWarehouseCart = createAsyncThunk(
  "distributor/removeFromWarehouseCart",
  async (
    {
      productId: product_id,
      onSuccess,
    }: { productId: string; onSuccess: () => void },
    { getState }
  ) => {
    const {
      distributor: { cartId: cart_id, retailer },
    } = getState() as RootState;

    return await request({
      url: "/commerce/remove-cart-item",
      method: "put",
      body: {
        cart_id,
        product_id,
        retailer_id: retailer?.retailer_id,
      },
      user: "distributor",
      onSuccess,
    });
  }
);

export const placeOrder = createAsyncThunk(
  "distributor/placeOrder",
  async (
    order: {
      location?: { latitude: number; longitude: number };
      delivery_instructions?: string;
      delivery_options: number;
      pickup_time?: string;
      delivery_time?: string;
    },
    { getState }
  ) => {
    const {
      distributor: { cartId: cart_id, retailer },
    } = getState() as RootState;

    return await request({
      url: "/commerce/order",
      method: "post",
      body: {
        ...order,
        retailer_id: retailer?.retailer_id,
        cart_id,
      },
      user: "distributor",
    });
  }
);

export const completeOrder = createAsyncThunk(
  "distributor/completeOrder",
  async (body: {
    order_doc_id: string;
    payment_option: number;
    retailer_id: string;
  }) => {
    return await request({
      url: "/commerce/complete",
      method: "post",
      body,
      user: "distributor",
    });
  }
);

export const fetchAccountDetails = createAsyncThunk(
  "distributor/fetchAccountDetails",
  async (body: { order_doc_id: string }) => {
    return await request({
      url: "/commerce/pay-warehouse",
      method: "post",
      body,
      user: "distributor",
    });
  }
);

export const verifyPayment = createAsyncThunk(
  "distributor/verifyPayment",
  async (
    {
      order_doc_id,
      onSuccess,
      split_amount,
    }: {
      order_doc_id: string;
      onSuccess: () => void;
      split_amount?: number;
    },
    { getState }
  ) => {
    const {
      distributor: { retailer },
    } = getState() as RootState;

    return await request({
      url: "/commerce/verify-txn",
      method: "post",
      body: { order_doc_id, retailer_id: retailer?.retailer_id, split_amount },
      user: "distributor",
      onSuccess,
    });
  }
);

export const createCoupon = createAsyncThunk(
  "distributor/createCoupon",
  async ({
    onSuccess,
    ...body
  }: {
    warehouse_id: string;
    amount: number;
    onSuccess?: () => void;
  }) => {
    return await request({
      url: "/coupon/create",
      method: "post",
      body,
      user: "distributor",
      onSuccess,
    });
  }
);

export const applyCoupon = createAsyncThunk(
  "distributor/applyCoupon",
  async (
    {
      onSuccess,
      ...body
    }: {
      warehouse_id: string;
      coupon: string;
      amount: number;
      onSuccess?: () => void;
    },
    { getState }
  ) => {
    const {
      distributor: { retailer, cartId },
    } = getState() as RootState;

    return await request({
      url: "/coupon/apply",
      method: "post",
      body: {
        ...body,
        cart_id: cartId,
        retailer_id: retailer?.retailer_id,
      },
      user: "distributor",
      onSuccess,
    });
  }
);

export const fetchCoupons = createAsyncThunk(
  "distributor/fetchCoupons",
  async () => {
    return await request({
      url: `/coupon/retrieve`,
      method: "get",
      user: "distributor",
    });
  }
);

export const reorderItems = createAsyncThunk(
  "distributor/reorderItems",
  async ({
    onSuccess,
    order_doc_id,
  }: {
    order_doc_id: string;
    onSuccess?: () => void;
  }) => {
    return await request({
      url: "/commerce/reorder",
      method: "post",
      body: {
        order_doc_id,
      },
      user: "distributor",
      onSuccess,
    });
  }
);

export const distributorSlice = createSlice({
  name: "distributor",
  initialState,
  reducers: {
    completeStep: (state, { payload }) => {
      state.stepsCompleted = payload;
    },
    completeSaleStep: (state, { payload }) => {
      state.saleStepsCompleted = payload;
    },
    updateDistributor: (state, { payload }: { payload: DistributorState }) => {
      for (const item in payload) {
        // @ts-ignore
        state[item] = payload[item];
      }
      state.businessName = payload.businessName;
    },
    addOwner: (state, { payload }: { payload: Owner }) => {
      state.owners?.push(payload);
    },
    removeOwner: (state, { payload }: { payload: string }) => {
      let owners = state.owners?.filter((owner) => owner.idImage !== payload);
      state.owners = owners;
    },
    resetWarehouseStamp: (state) => {
      state.warehouseStamp = null;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartId = null;
      state.retailer = null;
      state.previousOrder = [];
      state.previousOrderId = null;
      state.saleStepsCompleted = 0;
    },
    updateSplitPayment: (state, { payload }) => {
      state.splitPayment = payload;
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(signin.fulfilled, (state, { payload: { step } }) => {
      //   if (step > 0) state.stepsCompleted = 3
      // })
      .addMatcher(isPendingAction("distributor"), (state, action) => {
        switch (action.type) {
          case "distributor/addToWarehouseCart/pending":
            state.warehouseStamp = action.meta.arg.cartItem.id;
            break;
          case "distributor/removeFromWarehouseCart/pending":
            state.warehouseStamp = action.meta.arg.productId;
            break;
        }

        state.loading = true;
      })
      .addMatcher(isRejectedAction("distributor"), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilledAction("distributor"), (state, action) => {
        switch (action.type) {
          case "distributor/submitDistributor/fulfilled":
            state.stepsCompleted = 3;
            break;
          case "distributor/addWarehouse/fulfilled":
          case "distributor/editWarehouse/fulfilled":
          case "distributor/manageWarehouse/fulfilled":
          case "distributor/changeWarehouseManager/fulfilled":
            state.warehouseStamp = new Date().getTime();
            break;
          case "distributor/fetchWarehouses/fulfilled":
            state.warehouses = action.payload.data;
            break;
          case "distributor/fetchWarehouse/fulfilled":
            state.warehouse = action.payload.data;
            break;
          case "distributor/fetchWarehouseOrder/fulfilled":
          case "distributor/updateWarehouseOrder/fulfilled":
            state.order = {
              ...action.payload.data,
              ...(action.payload.pickup_code && {
                pickup_code: action.payload.pickup_code,
              }),
            };
            break;
          case "distributor/confirmOrderPickup/fulfilled":
            state.order = action.payload.data;
            state.warehouseStamp = new Date().getTime();
            break;
          case "distributor/createRetailer/fulfilled":
            state.retailer = action.payload.data;
            break;
          case "distributor/findRetailer/fulfilled":
            state.retailer = action.payload.data;
            break;
          case "distributor/fetchCart/fulfilled":
            let cartItems =
              action.payload.cart.line_items?.map((item: any) => ({
                id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                image: item.images[0],
                discountPrice: item.discount_price,
                discountQuantity: item.discount_qty,
              })) || [];

            if (action.meta.arg) {
              state.previousOrder = cartItems;
              state.previousOrderId = action.payload.cart.order_doc_id;
            } else {
              state.cartItems = cartItems;
              state.cartId = action.payload.cart._id;
            }
            break;
          case "distributor/addToWarehouseCart/fulfilled":
            let itemInCart = state.cartItems?.find(
              (item) => item.id === action.meta.arg.cartItem.id
            );
            state.cartItems = itemInCart
              ? state.cartItems?.map((item) =>
                  item.id === action.meta.arg.cartItem.id
                    ? action.meta.arg.cartItem
                    : item
                )
              : [...(state.cartItems || []), action.meta.arg.cartItem];
            state.cartId = action.payload.cart_id;
            break;
          case "distributor/removeFromWarehouseCart/fulfilled":
            state.cartItems = state.cartItems?.filter(
              (item) => item.id !== action.meta.arg.productId
            );
            break;
          case "distributor/placeOrder/fulfilled":
            state.orderId = action.payload.id;
            state.warehouseStamp = action.payload.id;
            state.orderType =
              action.meta.arg.delivery_options === 1 ? "delivery" : "pickup";
            break;
          case "distributor/completeOrder/fulfilled":
            state.warehouseStamp = new Date().getTime();
            state.cartItems = [];
            state.cartId = null;
            state.previousOrder = [];
            state.previousOrderId = null;
            state.retailer = null;
            state.saleStepsCompleted = 0;
            state.couponAmount = 0;
            break;
          case "distributor/fetchWarehouseOrders/fulfilled":
            state.orders = action.payload.data;
            break;
          case "distributor/fetchWarehouseRetailerOrder/fulfilled":
            state.orders = action.payload.data;
            break;
          case "distributor/verifyPayment/fulfilled":
            state.cartItems = [];
            state.cartId = null;
            state.previousOrder = [];
            state.previousOrderId = null;
            state.couponAmount = 0;
            break;
          case "distributor/fetchAccountDetails/fulfilled":
            state.accountDetails = action.payload.data;
            break;
          case "distributor/fetchCoupons/fulfilled":
            state.coupons = action.payload.data.coupon_data;
            break;
          case "distributor/applyCoupon/fulfilled":
            state.couponAmount = action.payload.data.coupon_amount;
            break;
          case "distributor/reorderItems/fulfilled":
            state.cartId = action.payload.cart_id;
            state.cartItems =
              action.payload.line_items?.map((item: any) => ({
                id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                image: item.images[0],
                discountPrice: item.discount_price,
                discountQuantity: item.discount_qty,
              })) || [];
            break;
        }

        state.loading = false;
      });
  },
});

export const {
  completeStep,
  completeSaleStep,
  updateDistributor,
  addOwner,
  removeOwner,
  resetWarehouseStamp,
  clearCart,
  updateSplitPayment,
} = distributorSlice.actions;

export default distributorSlice.reducer;
