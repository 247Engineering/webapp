import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import logo from "../../../assets/images/24.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";
import Loader from "../../../components/miscellaneous/Loader";

import { RetailerState } from "../../../types";
import { AppDispatch, RootState } from "../../../store";
import {
  fetchAccountDetails,
  verifyPayment,
} from "../../../store/features/retailer";
import * as ROUTES from "../../../routes";

const RetailerTransferPayment = () => {
  const navigate = useNavigate();
  const { order } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, loading, accountDetails, deliveryFee, orderType } =
    useSelector<RootState>(({ retailer }) => retailer) as RetailerState;

  console.log({deliveryFee, orderType})

  const amount = useMemo(
    () =>
      (
        cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) +
        (orderType === "delivery" ? deliveryFee : 0)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [cartItems, deliveryFee, orderType]
  );

  const handleSubmit = () => {
    dispatch(
      verifyPayment({
        order_doc_id: order as string,
        onSuccess: () => {
          navigate(ROUTES.RETAILER.ORDER_NOTIFICATION_FOR(order as string));
        },
      })
    );
  };

  useEffect(() => {
    dispatch(fetchAccountDetails({ order_doc_id: order as string }));
  }, [order, dispatch]);

  return (
    <div>
      <AppLayout
        cart
        // hideLogo
        // hideName
        secondaryNav="Make Payment"
        secondaryNavBack="Checkout"
        back={ROUTES.RETAILER.PAYMENT_FOR(order as string)}
      >
        {loading && !accountDetails ? <Loader /> : null}
        <section>
          <div>
            <div className="flex justify-between">
              <div>
                <h5 className="font-[700] text-[1.25rem] leading-[1.75rem] mb-1">
                  N{amount}
                </h5>
                <p className="text-[0.875rem] leading-[1.25rem]">
                  Pay to: 24Seven Limited
                </p>
              </div>
              <img src={logo} alt="24" />
            </div>
            <p className="my-[2rem] text-[0.75rem] leading-[1rem] px-2 text-center">
              Kindly proceed to your mobile/internet banking app to finalise the
              bank transfer payment to 24Seven Limited.
            </p>
            <div className="font-[700] text-[0.75rem] leading-[1rem]">
              <div className="pb-4 mb-4 flex justify-between items-center border border-solid border-grey-light-100 border-0 border-b">
                <span>Amount</span>
                <span>N{amount}</span>
              </div>
              <div className="pb-4 mb-4 flex justify-between items-center border border-solid border-grey-light-100 border-0 border-b">
                <span>Bank</span>
                <span>{accountDetails?.destination_bank}</span>
              </div>
              <div className="pb-4 mb-4 flex justify-between items-center border border-solid border-grey-light-100 border-0 border-b">
                <span>Account number</span>
                <span>{accountDetails?.account_number}</span>
              </div>
              <div className="pb-4 mb-4 flex justify-between items-center border border-solid border-grey-light-100 border-0 border-b">
                <span>Beneficiary name</span>
                <span>{accountDetails?.account_name}</span>
              </div>
            </div>
          </div>

          <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[1rem] leading-[1.5rem]">Total</span>
              <span className="font-[700] text-[1.25rem] leading-[1.75rem]">
                N{amount}
              </span>
            </div>
            <ButtonSubmit
              disabled={loading}
              loading={loading}
              text="I have made this bank transfer"
              onClick={handleSubmit}
              className="text-white bg-orange"
            />
          </div>
        </section>
      </AppLayout>
    </div>
  );
};

export default RetailerTransferPayment;
