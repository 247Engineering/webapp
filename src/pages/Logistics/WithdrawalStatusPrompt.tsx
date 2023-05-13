import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import AppLayout from "../../components/layouts/AppLayout";

import withdraw from "../../assets/images/withdraw-success.svg";

import * as ROUTES from "../../routes";

const RetailerOrderStatusNotification = () => {
  const navigate = useNavigate();
  const { order } = useParams();

  return (
    <>
      <AppLayout
        alternate
        onClose={() => {
          navigate(ROUTES.LOGISTICS.WALLET);
        }}
      >
        <div className="flex flex-col items-center text-center">
          <img
            src={withdraw}
            alt="withdrawal success"
            className="mt-8 mb-6 w-[6.25rem] h-[6.25rem]"
          />
          <h4 className="mb-2 font-[700] text-[1.25rem] leading-[1.75rem]">
            Your withdrawal was successful
          </h4>
          <p className="text-black-100 text-[1rem] leading-[1.5rem] mb-6 max-w-[15.125rem]">
            N
            {30000000?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            was transfered to you bank account.
          </p>
          <Link
            to={ROUTES.RETAILER.ORDER_STATUS_FOR(order as string)}
            className="font-[700] text-[0.75rem] leading-[1rem] text-purple"
          >
            View withdrawal details
          </Link>
        </div>
      </AppLayout>
    </>
  );
};

export default RetailerOrderStatusNotification;
