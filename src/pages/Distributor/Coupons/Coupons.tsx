import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import search from "../../../assets/images/search.svg";
import add from "../../../assets/images/add.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import SortSelect from "../../../components/forms/SortSelect";
import TableLayout from "../../../components/tables/TableLayout";
import TableFooter from "../../../components/tables/TableFooter";
import Loader from "../../../components/miscellaneous/Loader";

import { fetchCoupons } from "../../../store/features/distributor";
import { AppDispatch, RootState } from "../../../store";
import { DistributorState } from "../../../types";
import * as ROUTES from "../../../routes";

const Coupons = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { coupons, loading } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  return (
    <>
      <AppLayout>
        {loading ? <Loader /> : null}
        <header>
          <h1 className="h1 text-black">Coupons</h1>
        </header>
        <section className="mt-6 text-black">
          <div className="flex justify-between items-center mb-[1.875rem]">
            <div className="flex items-center">
              <SortSelect
                options={[
                  "Value - highest to lowest",
                  "Value - lowest to highest",
                ]}
                value={sort}
                onChange={(value) => setSort(value)}
              />
              <button
                className="d-flex justify-center items-center rounded-full bg-grey h-[2rem] w-[2rem] ml-2"
                onClick={() => {}}
              >
                <img
                  src={search}
                  alt="search"
                  className="w-[1.25rem] h-[1.25rem] ml-[6px]"
                />
              </button>
            </div>
            <button
              className="button-add rounded-[12px] bg-orange text-white w-[3rem] h-[3rem]"
              onClick={() => navigate(ROUTES.DISTRIBUTOR.COUPON_FORM)}
            >
              <img src={add} alt="add" className="w-[0.75rem] h-[0.75rem]" />
            </button>
          </div>
          <TableLayout>
            <thead>
              <tr>
                <th className="w-[9.5rem]">Coupon</th>
                <th className="w-[9.5rem]">Date Created</th>
                <th className="w-[9.5rem]">Created By</th>
                <th className="w-[9.5rem]">Value (N)</th>
                <th className="w-[9.5rem]">Warehouse</th>
                <th className="w-[9.5rem]">Status</th>
              </tr>
            </thead>
            <tbody>
              {coupons?.map((coupon) => (
                <tr key={coupon.coupon}>
                  <td className="w-[9.5rem] overflow-hidden text-ellipsis p-4 font-[700] text-[0.75rem] leading-[1rem] text-purple">
                    {coupon.coupon}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {format(new Date(coupon.date_created), "dd/M/yyy hh:ma")}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {coupon.coupon_creator}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {coupon.coupon_amount.toLocaleString()}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {coupon.warehouse}
                  </td>
                  <td
                    className={`w-[9.5rem] p-4 text-[0.75rem] leading-[1rem] font-[700] ${
                      coupon.status === "VALID" ? "text-green" : "text-red"
                    }`}
                  >
                    {coupon.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableLayout>
          <TableFooter total={coupons?.length || 0} />
        </section>
      </AppLayout>
    </>
  );
};

export default Coupons;
