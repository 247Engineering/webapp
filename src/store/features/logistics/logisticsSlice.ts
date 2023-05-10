import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { LogisticsState } from "../../../types";
import request from "../../../helpers/request";
// import { RootState } from "../..";
import { signin } from "../auth";
import { isRejectedAction, isPendingAction, isFulfilledAction } from "../utils";

const initialState: LogisticsState = {
  vehicleNumber: null,
  stepsCompleted: 0,
  loading: false,
  order: null,
  orderStatus: "ENROUTE",
  balance: 0,
  deliveries: [],
};

export const addVehicleInfo = createAsyncThunk(
  "logistics/addVehicleInfo",
  async ({
    onSuccess,
    ...body
  }: {
    onSuccess: () => void;
    plate_number: string;
    license: string;
  }) => {
    await request({
      url: "/auth/setup-vehicle",
      method: "post",
      body,
      user: "logistics",
      onSuccess,
    });
  }
);

export const setupBankAccount = createAsyncThunk(
  "logistics/setupBankAccount",
  async ({
    onSuccess,
    ...body
  }: {
    onSuccess?: () => void;
    settlementBank: string;
    settlementAccountNumber: string;
    settlementAccountName: string;
  }) => {
    await request({
      url: "/auth/setup-bank-account",
      method: "post",
      body,
      user: "logistics",
      onSuccess,
    });
  }
);

export const updateOrderStatus = createAsyncThunk(
  "logistics/updateOrderStatus",
  async ({
    order_status,
    order,
    pickup_code,
    delivery_code,
    onSuccess,
  }: {
    order_status: "ARRIVED" | "PICKED" | "RT_DELIVERED" | "DELIVERED";
    order: string;
    pickup_code?: string;
    delivery_code?: string;
    onSuccess?: () => void;
  }) => {
    await request({
      url: `/order/update/${order}`,
      method: "put",
      body: {
        order_status,
        ...(pickup_code && { pickup_code }),
        ...(delivery_code && { delivery_code }),
      },
      user: "logistics",
      onSuccess,
    });
  }
);

export const fetchBalance = createAsyncThunk(
  "logistics/fetchBalance",
  async () => {
    return await request({
      url: `/rider/balance`,
      method: "get",
      user: "logistics",
    });
  }
);

export const fetchDeliveries = createAsyncThunk(
  "logistics/fetchDeliveries",
  async () => {
    return await request({
      url: `/rider/deliveries`,
      method: "get",
      user: "logistics",
    });
  }
);

export const logisticsSlice = createSlice({
  name: "logistics",
  initialState,
  reducers: {
    setOrder: (
      state,
      { payload }: { payload: { data: any; onSuccess: () => void } }
    ) => {
      state.order = { ...payload.data, status: "found" };
      payload.onSuccess();
    },
    clearOrder: (state, { payload }: { payload: () => void }) => {
      state.order = null;
      state.orderStatus = "ENROUTE";
      payload();
    },
    updateOrder: (
      state,
      { payload }: { payload: { status: string; onSuccess: () => void } }
    ) => {
      state.order = { ...state.order, status: payload.status };
      payload.onSuccess();
    },
    completeStep: (state, { payload }) => {
      state.stepsCompleted = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signin.fulfilled, (state, { payload: { plate_number } }) => {
        state.vehicleNumber = plate_number;
      })
      .addMatcher(isPendingAction("logistics"), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction("logistics"), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilledAction("logistics"), (state, action) => {
        switch (action.type) {
          case "logistics/addVehicleInfo/fulfilled":
            state.vehicleNumber = action.meta.arg.plate_number;
            state.stepsCompleted = 1;
            break;
          case "logistics/updateOrderStatus/fulfilled":
            state.orderStatus = action.meta.arg.order_status;
            break;
          case "logistics/fetchBalance/fulfilled":
            state.balance = action.payload.balance;
            break;
          case "logistics/fetchDeliveries/fulfilled":
            state.deliveries = action.payload.deliveries;
            break;
          case "logistics/setupBankAccount/fulfilled":
            state.stepsCompleted = 2;
            break;
        }

        state.loading = false;
      });
  },
});

export const { setOrder, clearOrder, updateOrder } = logisticsSlice.actions;

export default logisticsSlice.reducer;
