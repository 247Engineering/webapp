import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import location from "../../../assets/images/location.svg";
import add from "../../../assets/images/add.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import DatePicker from "../../../components/miscellaneous/DatePicker/DatePicker";
import Loader from "../../../components/miscellaneous/Loader";

import { RootState, AppDispatch } from "../../../store";
import { AuthState, DistributorState } from "../../../types";
import { fetchWarehouses } from "../../../store/features/distributor";
import * as ROUTES from "../../../routes";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { firstName, type } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;

  const { businessName, warehouses, loading } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [start, setStart] = useState(addDays(new Date(), -30));
  const [end, setEnd] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [open, setOpen] = useState(false);

  const setSelectedRange = (dates: { start: Date; end: Date }) => {
    setStart(dates.start);
    setEnd(dates.end);
  };

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  return (
    <div
      onClick={() => {
        setShowCalendar(false);
        setOpen(false);
      }}
      className="h-full"
    >
      <AppLayout>
        {loading ? <Loader /> : null}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="h1 mb-2 capitalize text-black">Hi {firstName}!</h1>
            <p className="p text-black-100">
              <img
                src={location}
                className="w-[1.563rem] h-[1.25rem] inline"
                alt="location icon"
              />{" "}
              {businessName} HQ.
            </p>
          </div>
          {type === "warehouse" ? (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                className="button-add rounded-[10px] bg-orange text-white p-[0.625rem]"
                onClick={() => setOpen(true)}
              >
                <img
                  src={add}
                  alt="add"
                  className="w-[0.729rem] h-[0.729rem] mr-1"
                />
                <span>Create Sale</span>
              </button>
              {open ? (
                <ul className="rounded-[8px] shadow-sm py-2 w-[11.125rem] absolute right-0 z-10 bg-white">
                  {warehouses
                    ?.filter((warehouse) => warehouse.created)
                    .map((warehouse) => (
                      <li
                        key={warehouse._id}
                        className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p"
                        onClick={() =>
                          navigate(
                            ROUTES.DISTRIBUTOR.WAREHOUSE_SALE_FOR(
                              warehouse?._id
                            )
                          )
                        }
                      >
                        {warehouse.name}
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </header>
        <section className="mt-6">
          <DatePicker
            setSelectedRange={setSelectedRange}
            start={start}
            end={end}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
          />
        </section>
      </AppLayout>
    </div>
  );
};

export default Dashboard;
