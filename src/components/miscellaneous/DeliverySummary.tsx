import React from "react";
import { format } from "date-fns";

import Status from "./Status";

import { DeliverySummaryProps } from "../../types";

const DeliverySummary = ({
  status,
  id,
  date,
  amount,
  onClick,
}: DeliverySummaryProps) => {
  return (
    <div
      className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b"
      onClick={onClick}
    >
      <div>
        <h6 className="mb-2">#{id}</h6>
        <Status
          className={`${
            status === "Delivered"
              ? "bg-green-light text-green"
              : "bg-[#FFEBEE] text-red"
          } rounded-[6px] mr-2 py-1 px-2`}
          text={status}
        />
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

export default DeliverySummary;
