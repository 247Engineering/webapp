import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import back from "../../assets/images/back.svg";
import filter from "../../assets/images/filter.svg";
import searchIcon from "../../assets/images/search-alt.svg";

import AppLayout from "../../components/layouts/AppLayout";
import DeliverySummary from "../../components/miscellaneous/DeliverySummary";

// import { AppDispatch, RootState } from "../../store";
// import { LogisticsState } from "../../types";
// import { setOrder } from "../../store/features/logistics";
// import * as ROUTES from "../../routes";

const Deliveries = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  // const { order } = useSelector<RootState>(
  //   ({ product }) => product
  // ) as LogisticsState;

  const [search, setSearch] = useState("");
  const [type, setType] = useState("unpaid");

  return (
    <>
      <AppLayout logistics>
        <div className="mt-[-2rem] mb-[-4rem]">
          <header className="mb-4">
            <img src={back} className="p-[0.667rem] mb-2" alt="back" />
            <h1 className="font-bold text-[1.25rem] leading-[1.75rem]">
              Deliveries
            </h1>
          </header>

          <div className="flex mb-6">
            <div className="relative mr-2 grow">
              <input
                className="bg-grey rounded-[50px] p-[0.625rem] pl-[2.75rem] h-full w-full"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <img
                src={searchIcon}
                alt="search"
                className="absolute left-[1.104rem] top-[0.656rem]"
              />
            </div>
            <button className="flex justify-center items-center rounded-[10px] w-[2.5rem] h-[2.5rem] bg-orange">
              <img src={filter} alt="filter" />
            </button>
          </div>

          <div className="p-1 bg-grey-light-200 rounded-[10px] flex items-center justify-between font-[700] text-[0.875rem] leading-[1.25rem] mb-6">
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] py-[0.625rem] px-[0.875rem] w-[50%] ${
                type === "unpaid" ? "text-orange bg-orange-light-100" : ""
              }`}
              onClick={() => setType("unpaid")}
            >
              Unpaid
            </button>
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] py-[0.625rem] px-[0.875rem] w-[50%] ${
                type === "paid" ? "text-orange bg-orange-light-100" : ""
              }`}
              onClick={() => setType("paid")}
            >
              Paid
            </button>
          </div>

          <DeliverySummary
            id="1111111"
            date={new Date()}
            status="Delivered"
            amount={5000}
          />
          <DeliverySummary
            id="1111111"
            date={new Date()}
            status="Cancelled"
            amount={5000}
          />
        </div>
      </AppLayout>
    </>
  );
};

export default Deliveries;
