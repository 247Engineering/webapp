import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import Input from "../../../components/forms/Input";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";

import { AppDispatch, RootState } from "../../../store";
import { DistributorState } from "../../../types";
import {
  fetchWarehouses,
  createCoupon,
} from "../../../store/features/distributor";
import * as ROUTES from "../../../routes";

const CouponForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { warehouses, loading } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [warehouse, setWarehouse] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createCoupon({
        warehouse_id: warehouse,
        amount,
        onSuccess: () => navigate(ROUTES.DISTRIBUTOR.COUPONS),
      })
    );
  };

  const canSubmit = useMemo(
    () => [warehouse, amount].every((data) => !!data),
    [warehouse, amount]
  );

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  return (
    <>
      <AppLayout
        alternate
        onClose={() => {
          navigate(-1);
        }}
      >
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Tell us about your coupon
          </h1>
          <p className="p text-black-100">
            Setting up your coupon, it will only take seconds
          </p>
        </header>
        <section className="mt-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Warehouse"
                value={warehouse}
                onChange={(value: string) =>
                  setWarehouse(value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())
                }
                options={warehouses?.map((warehouse) => ({
                  value: warehouse._id,
                  label: warehouse.name,
                }))}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Amount"
                value={amount}
                onChange={setAmount}
                type="number"
                prefix="N "
              />
            </div>
            <ButtonSubmit
              text="Create"
              onClick={handleSubmit}
              className="mt-12"
              disabled={!canSubmit || loading}
              loading={loading}
            />
          </form>
        </section>
      </AppLayout>
    </>
  );
};

export default CouponForm;
