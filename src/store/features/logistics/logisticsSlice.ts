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

export const distributorSlice = createSlice({
  name: "distributor",
  initialState,
  reducers: {
    // resetWarehouseStamp: (state) => {
    //   state.warehouseStamp = null;
    // },
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
        }

        state.loading = false;
      });
  },
});

// export const {} = distributorSlice.actions;

export default distributorSlice.reducer;
