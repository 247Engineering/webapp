import React, { useState, useMemo } from "react";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import Input from "../../../components/forms/Input";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";

import {
  // AppDispatch,
  RootState,
} from "../../../store";
import { DistributorState } from "../../../types";
import // completeStep,
// updateDistributor,
"../../../store/features/distributor";
import * as ROUTES from "../../../routes";

const CouponForm = () => {
  const navigate = useNavigate();

  // const dispatch = useDispatch<AppDispatch>();

  const distributor = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [coupon, setCoupon] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(ROUTES.DISTRIBUTOR.COUPONS);
  };

  const canSubmit = useMemo(
    () => [coupon, amount].every((data) => !!data),
    [coupon, amount]
  );

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
                label="Coupon"
                value={coupon}
                onChange={(value: string) =>
                  setCoupon(value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())
                }
                type="text"
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
              disabled={!canSubmit}
            />
          </form>
        </section>
      </AppLayout>
    </>
  );
};

export default CouponForm;
