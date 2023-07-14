import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Address, CartItem, RetailerState } from "../../../types";
import request from "../../../helpers/request";
import { isRejectedAction, isPendingAction, isFulfilledAction } from "../utils";
import { signin } from "../auth";
import { RootState } from "../..";

const initialState: RetailerState = {
  retailerStamp: null,
  loading: false,
  cartItems: [],
  cartId: null,
  orderId: null,
  orders: [],
  order: null,
  warehouse: null,
  location: null,
  accountDetails: null,
  deliveryFee: 0,
  orderType: "delivery",
};

export const addBusinessInfo = createAsyncThunk(
  "retailer/addBusinessInfo",
  async (
    body: {
      fname: string;
      lname: string;
      email?: string;
      business_name: string;
      address: Address;
    },
    { getState }
  ) => {
    const {
      auth: { id },
    } = getState() as RootState;

    return await request({
      url: "/auth/complete-signup",
      method: "post",
      body: {
        user_id: id,
        ...body,
      },
      user: "retailer",
    });
  }
);

export const getDeliveryFee = createAsyncThunk(
  "retailer/getDeliveryFee",
  async () => {
    return await request({
      url: "/commerce/delivery-fee",
      method: "get",
      user: "retailer",
    });
  }
);

export const fetchCart = createAsyncThunk("retailer/fetchCart", async () => {
  return await request({
    url: "/commerce/get-cart",
    method: "get",
    user: "retailer",
  });
});

export const addToCart = createAsyncThunk(
  "retailer/addToCart",
  async (
    { cartItem, onSuccess }: { cartItem: CartItem; onSuccess: () => void },
    { getState }
  ) => {
    const {
      retailer: { cartItems },
    } = getState() as RootState;

    let itemInCart = cartItems.find((item) => item.id === cartItem.id);

    const line_items = itemInCart
      ? cartItems.map((item) =>
          item.id === cartItem.id
            ? { quantity: cartItem.quantity, product_id: cartItem.id }
            : { quantity: item.quantity, product_id: item.id }
        )
      : [
          ...cartItems.map((item) => ({
            quantity: item.quantity,
            product_id: item.id,
          })),
          { quantity: cartItem.quantity, product_id: cartItem.id },
        ];

    return await request({
      url: "/commerce/add-cart",
      method: "post",
      body: { line_items },
      user: "retailer",
      onSuccess,
    });
  }
);

export const removeFromCart = createAsyncThunk(
  "retailer/removeFromCart",
  async (
    {
      productId: product_id,
      onSuccess,
    }: { productId: string; onSuccess: () => void },
    { getState }
  ) => {
    const {
      retailer: { cartId: cart_id },
    } = getState() as RootState;

    return await request({
      url: "/commerce/remove-cart-item",
      method: "put",
      body: {
        cart_id,
        product_id,
      },
      user: "retailer",
      onSuccess,
    });
  }
);

export const placeOrder = createAsyncThunk(
  "retailer/placeOrder",
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
      auth: { id: user_id },
      retailer: { cartId: cart_id },
    } = getState() as RootState;

    return await request({
      url: "/commerce/place-order",
      method: "post",
      body: {
        ...order,
        user_id,
        cart_id,
      },
      user: "retailer",
    });
  }
);

export const completeOrder = createAsyncThunk(
  "retailer/completeOrder",
  async (body: { order_doc_id: string; payment_option: number }) => {
    return await request({
      url: "/commerce/complete-order",
      method: "post",
      body,
      user: "retailer",
    });
  }
);

export const fetchOrders = createAsyncThunk(
  "retailer/fetchOrders",
  async () => {
    return await request({
      url: "/commerce/get-orders",
      method: "get",
      user: "retailer",
    });
  }
);

export const fetchSingleOrder = createAsyncThunk(
  "retailer/fetchSingleOrder",
  async (id: string) => {
    return await request({
      url: `/commerce/order/${id}`,
      method: "get",
      user: "retailer",
    });
  }
);

export const fetchAccountDetails = createAsyncThunk(
  "retailer/fetchAccountDetails",
  async (body: { order_doc_id: string }) => {
    return await request({
      url: "/payment/pay-warehouse",
      method: "post",
      body,
      user: "retailer",
    });
  }
);

export const verifyPayment = createAsyncThunk(
  "retailer/verifyPayment",
  async ({
    order_doc_id,
    onSuccess,
  }: {
    order_doc_id: string;
    onSuccess: () => void;
  }) => {
    return await request({
      url: "/payment/verify-txn",
      method: "post",
      body: { order_doc_id },
      user: "retailer",
      onSuccess,
    });
  }
);

export const retailerSlice = createSlice({
  name: "retailer",
  initialState,
  reducers: {
    reset: () => initialState,
    clearRetailerStamp: (state) => {
      state.retailerStamp = null;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        signin.fulfilled,
        (state, { payload: { warehouse, retailer_geo } }) => {
          state.warehouse = warehouse;
          state.location = retailer_geo;
        }
      )
      .addMatcher(
        isPendingAction("retailer"),
        (state, { type, meta: { arg } }) => {
          switch (type) {
            case "retailer/addToCart/pending":
              state.retailerStamp = arg.cartItem.id;
              break;
            case "retailer/removeFromCart/pending":
              state.retailerStamp = arg.productId;
              break;
          }

          state.loading = true;
        }
      )
      .addMatcher(isRejectedAction("retailer"), (state, action) => {
        state.loading = false;
      })
      .addMatcher(
        isFulfilledAction("retailer"),
        (state, { type, payload, meta: { arg } }) => {
          switch (type) {
            case "retailer/addBusinessInfo/fulfilled":
              state.retailerStamp = new Date().getTime();
              state.warehouse = payload.warehouse;
              state.location = payload.retailer_geo;
              break;
            case "retailer/addToCart/fulfilled":
              let itemInCart = state.cartItems.find(
                (item) => item.id === arg.cartItem.id
              );
              state.cartItems = itemInCart
                ? state.cartItems.map((item) =>
                    item.id === arg.cartItem.id ? arg.cartItem : item
                  )
                : [...state.cartItems, arg.cartItem];
              state.cartId = payload.cart_id;
              break;
            case "retailer/removeFromCart/fulfilled":
              state.cartItems = state.cartItems.filter(
                (item) => item.id !== arg.productId
              );
              break;
            case "retailer/fetchCart/fulfilled":
              state.cartItems =
                payload.cart.line_items?.map((item: any) => ({
                  id: item.product_id,
                  quantity: item.quantity,
                  price: item.price,
                  name: item.name,
                  image: item.images[0],
                })) || [];
              state.cartId = payload.cart._id || null;
              break;
            case "retailer/placeOrder/fulfilled":
              state.orderId = payload.id;
              state.retailerStamp = payload.id;
              state.orderType =
                arg.order.delivery_options === 1 ? "delivery" : "pickup";
              break;
            case "retailer/completeOrder/fulfilled":
              state.retailerStamp = new Date().getTime();
              state.cartItems = [];
              state.cartId = null;
              break;
            case "retailer/verifyPayment/fulfilled":
              state.cartItems = [];
              state.cartId = null;
              break;
            case "retailer/fetchOrders/fulfilled":
              state.orders = payload.orders;
              break;
            case "retailer/getDeliveryFee/fulfilled":
              state.deliveryFee = payload.delivery_fee;
              break;
            case "retailer/fetchSingleOrder/fulfilled":
              state.order = payload.order;
              break;
            case "retailer/fetchAccountDetails/fulfilled":
              state.accountDetails =
                payload.accountDetails || payload.accoutDetails;
              break;
          }

          state.loading = false;
        }
      );
  },
});

export const { reset, clearRetailerStamp, clearCart } = retailerSlice.actions;

export default retailerSlice.reducer;
