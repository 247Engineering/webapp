import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../../../components/layouts/AppLayout";
import OtpInput from "../../../components/forms/OtpInput";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";

import {
  confirmOrderPickup,
  resetWarehouseStamp,
} from "../../../store/features/distributor";
import { AppDispatch, RootState } from "../../../store";
import { DistributorState } from "../../../types";
import * as ROUTES from "../../../routes";

const ConfirmPickup = () => {
  const navigate = useNavigate();
  const { warehouse, order } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    warehouseStamp,
    order: { pickup_code },
  } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  // const [otp, setOtp] = useState(pickup_code);

  // const onChange = (value: string) => setOtp(value);

  const handleSubmit = () => {
    dispatch(
      confirmOrderPickup({
        order_doc_id: order as string,
        warehouse_id: warehouse as string,
        pickup_code,
      })
    );
  };

  useEffect(() => {
    if (warehouseStamp)
      navigate(
        ROUTES.DISTRIBUTOR.WAREHOUSE_ORDER_FOR(
          warehouse as string,
          order as string
        )
      );
    return () => {
      dispatch(resetWarehouseStamp());
    };
  }, [dispatch, navigate, warehouse, order, warehouseStamp]);

  return (
    <div className="h-full">
      <AppLayout alternate onClose={() => navigate(-1)}>
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Confirm pickup
          </h1>
          <p className="p text-black-100">
            Please share the PIN below with the trade agent
          </p>
        </header>
        <section className="mt-8 h-full flex flex-col text-black">
          <form onSubmit={handleSubmit}>
            <OtpInput disabled value={pickup_code || ""} onChange={() => {}} />
            <ButtonSubmit
              text="Submit"
              disabled={loading}
              loading={loading}
              onClick={handleSubmit}
              className="mt-[100%]"
            />
          </form>
        </section>
      </AppLayout>
    </div>
  );
};

export default ConfirmPickup;
