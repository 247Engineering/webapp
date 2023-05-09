import React from "react";
import { format } from "date-fns";

import success from "../../assets/images/payment-success.svg";
import failed from "../../assets/images/payment-fail.svg";

import { TransactionSummaryProps } from "../../types";

const TransactionSummary = ({
  successful,
  date,
  amount,
  onClick,
}: TransactionSummaryProps) => {
  return (
    <div
      className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={successful ? success : failed}
          alt="payment"
          className="mr-4"
        />
        <h6>Payment</h6>
      </div>
      <div className="text-right">
        <h6 className="mb-2">N{amount.toLocaleString()}</h6>
        <p className="font-normal text-black-100">
          {format(date, "MMM d, yyyy h:mma")}
        </p>
      </div>
    </div>
  );
};

export default TransactionSummary;
