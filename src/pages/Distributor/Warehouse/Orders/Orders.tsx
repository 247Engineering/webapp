import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import search from "../../../../assets/images/search.svg";

import AppLayout from "../../../../components/layouts/AppLayout";
import SortSelect from "../../../../components/forms/SortSelect";
import TableLayout from "../../../../components/tables/TableLayout";
import TableFooter from "../../../../components/tables/TableFooter";
import Status from "../../../../components/miscellaneous/Status";
import Loader from "../../../../components/miscellaneous/Loader";

import {
  fetchWarehouseOrders,
  fetchWarehouses,
} from "../../../../store/features/distributor";
import { AppDispatch, RootState } from "../../../../store";
import { DistributorState } from "../../../../types";
import * as ROUTES from "../../../../routes";
import MultiSelectCheckbox from "../../../../components/forms/MultiSelectCheckbox";

const statusMap = {
  PENDING: {
    statusText: "Pending order",
    statusClassName: "bg-pumpkin-light text-pumpkin",
  },
  CONFIRMED: {
    statusText: "Order confirmed",
    statusClassName: "bg-[#E9D9F1] text-[#461A53]",
  },
  PICKUP: {
    statusText: "Order confirmed",
    statusClassName: "bg-[#E9D9F1] text-[#461A53]",
  },
  DELIVERY: {
    statusText: "Out for delivery",
    statusClassName: "bg-pumpkin-light text-pumpkin",
  },
  COMPLETED: {
    statusText: "Order completed",
    statusClassName: "bg-green-light text-green",
  },
};

const Orders = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { orders, warehouses, loading } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [sort, setSort] = useState("");
  const [warehouseIds, setWarehouseIds] = useState(() =>
    warehouses?.map((warehouse) => warehouse._id).join(",")
  );

  useEffect(() => {
    if (warehouseIds) dispatch(fetchWarehouseOrders(warehouseIds));
    dispatch(fetchWarehouses());
  }, [dispatch, warehouseIds]);

  return (
    <>
      <AppLayout>
        {loading ? <Loader /> : null}
        <MultiSelectCheckbox
          items={warehouses || []}
          type="warehouses"
          className="mb-4"
          onChange={(ids) => {
            setWarehouseIds(ids.join(","));
          }}
        />
        <header>
          <h1 className="h1 text-black">Orders</h1>
        </header>
        <section className="mt-6 text-black">
          <div className="flex items-center mb-[1.875rem]">
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
          <TableLayout>
            <thead>
              <tr>
                <th className="w-[9.5rem]">Order ID</th>
                <th className="w-[9.5rem]">Date</th>
                <th className="w-[9.5rem]">Customer Address</th>
                <th className="w-[9.5rem]">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order.id}
                  onClick={() =>
                    navigate(
                      ROUTES.DISTRIBUTOR.WAREHOUSE_ORDER_FOR(
                        order.warehouse_id,
                        order.id
                      )
                    )
                  }
                >
                  <td className="w-[9.5rem] overflow-hidden text-ellipsis p-4 font-[700] text-[0.75rem] leading-[1rem] text-purple">
                    {order.order_id.replace("ORD_", "")}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {format(
                      order.order_date
                        ? new Date(order.order_date)
                        : new Date(),
                      "dd/M/yyy hh:ma"
                    )}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {order.address || "N/A"}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    <Status
                      className={`${
                        statusMap[order.status as keyof typeof statusMap]
                          .statusClassName
                      } rounded-[10px] py-1 px-2`}
                      text={
                        statusMap[order.status as keyof typeof statusMap]
                          .statusText
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableLayout>
          <TableFooter total={orders?.length || 0} />
        </section>
      </AppLayout>
    </>
  );
};

export default Orders;
