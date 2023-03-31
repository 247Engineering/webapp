import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { LogisticsState } from "../../../types";
import request from "../../../helpers/request";
// import { RootState } from "../..";
// import { signin } from '../auth'
import { isRejectedAction, isPendingAction, isFulfilledAction } from "../utils";

const initialState: LogisticsState = {
  vehicleNumber: null,
  stepsCompleted: 1,
  loading: false,
  order: null,
  orderStatus: "ENROUTE",
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
      payload();
    },
    updateOrder: (
      state,
      { payload }: { payload: { status: string; onSuccess: () => void } }
    ) => {
      state.order = { ...state.order, status: payload.status };
      payload.onSuccess();
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(signin.fulfilled, (state, { payload: { step } }) => {
      //   if (step > 0) state.stepsCompleted = 3
      // })
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
            break;
          case "logistics/updateOrderStatus/fulfilled":
            state.orderStatus = action.meta.arg.order_status;
            break;
        }

        state.loading = false;
      });
  },
});

export const { setOrder, clearOrder, updateOrder } = logisticsSlice.actions;

export default logisticsSlice.reducer;
