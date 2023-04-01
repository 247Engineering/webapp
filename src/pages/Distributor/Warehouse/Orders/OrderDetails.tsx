import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import image from "../../../../assets/images/image.svg";

import AppLayout from "../../../../components/layouts/AppLayout";
import TableLayout from "../../../../components/tables/TableLayout";
import Status from "../../../../components/miscellaneous/Status";
import ButtonSubmit from "../../../../components/forms/ButtonSubmit";
import Map from "../../../../components/miscellaneous/Map";
import BackButton from "../../../../components/forms/BackButton";

import {
  fetchWarehouseOrder,
  updateWarehouseOrder,
  resetWarehouseStamp,
} from "../../../../store/features/distributor";
import { AppDispatch, RootState } from "../../../../store";
import { DistributorState, OrderStatus } from "../../../../types";
import * as ROUTES from "../../../../routes";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { warehouse, order: orderId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { order, loading } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  useEffect(() => {
    dispatch(
      fetchWarehouseOrder({
        warehouse: warehouse as string,
        order: orderId as string,
      })
    );

    return () => {
      dispatch(resetWarehouseStamp());
    };
  }, [dispatch, warehouse, orderId]);

  const statusMap = {
    PENDING: {
      statusText: "Pending order",
      statusClassName: "bg-pumpkin-light text-pumpkin",
      buttonText: "Confirm order",
      nextStatus: "CONFIRMED",
      goToConfirm: false,
    },
    CONFIRMED: {
      statusText: "Order confirmed",
      statusClassName: "bg-[#E9D9F1] text-[#461A53]",
      buttonText: "Ready for pickup",
      nextStatus: "PICKUP",
      goToConfirm: false,
    },
    PICKUP: {
      statusText: "Order confirmed",
      statusClassName: "bg-[#E9D9F1] text-[#461A53]",
      buttonText: "Confirm pickup",
      nextStatus: "DELIVERY",
      goToConfirm: order?.delivery_type === "WH_DELIVERY" ? true : false,
    },
    DELIVERY: {
      statusText: "Out for delivery",
      statusClassName: "bg-pumpkin-light text-pumpkin",
      buttonText: null,
      nextStatus: null,
      goToConfirm: false,
    },
    COMPLETED: {
      statusText: "Order completed",
      statusClassName: "bg-green-light text-green",
      buttonText: null,
      nextStatus: null,
      goToConfirm: false,
    },
  };

  const orderStatus = statusMap[(order?.status || "PENDING") as OrderStatus];

  return (
    <>
      <AppLayout>
        <header>
          <BackButton text="Orders" />
          <h1 className="font-[700] text-[1.25rem] leading-[1.75rem] my-2 text-black">
            Order #{order?.order_id.replace("ORD_", "")}
          </h1>
          <p className="p mb-2 text-black-100">
            {format(
              order?.order_date ? new Date(order.order_date) : new Date(),
              "dd/M/yyy"
            )}{" "}
            at{" "}
            {format(
              order?.order_date ? new Date(order.order_date) : new Date(),
              "h:Ma"
            )}
          </p>
          <div className="flex">
            <Status
              className="bg-green-light text-green rounded-[10px] mr-2 py-1 px-2"
              text="Paid"
            />
            <Status
              className={`${orderStatus.statusClassName} rounded-[10px] py-1 px-2`}
              text={orderStatus.statusText}
            />
          </div>
        </header>
        <section className="mt-6 text-black">
          <TableLayout>
            <thead>
              <tr>
                <th className="w-[14.688rem]">Item</th>
                <th className="w-[14.688rem]">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order?.line_items.map((item: any) => (
                <tr key={item.product_id}>
                  <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                    <div className="flex">
                      <img
                        src={item.images[0] || image}
                        className="w-[2rem] h-[2rem] rounded-[2px] mr-2"
                        alt="product item"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="font-[700] capitalize">{item.name}</p>
                        <p>75ml</p>
                      </div>
                    </div>
                  </td>
                  <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                    N{Number(item.price).toLocaleString()} x {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableLayout>
          <div className="mt-[1.875rem] rounded-tr-[12px] rounded-tl-[12px] border border-solid border-grey-light w-full h-[8.375rem] overflow-hidden">
            <Map
              center={{ lat: 9.0765, lng: 7.3986 }}
              lat={9.0765}
              lng={7.3986}
            />
          </div>
          <div className="rounded-br-[12px] rounded-bl-[12px] border border-solid border-grey-light p-4 mb-[2.375rem]">
            <h5 className="mb-4 font-[700] text-[1rem] leading-[1.5rem]">
              Customer Information
            </h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-[0.75rem] leading-[1rem]">
                <h6 className="font-[700] mb-2">Shipping address</h6>
                <p className="max-w-[8.75rem] capitalize">
                  {order?.delivery_type === "WH_DELIVERY"
                    ? order.address
                    : "Retailer Pickup"}
                </p>
              </div>
              <div className="text-[0.75rem] leading-[1rem]">
                <h6 className="font-[700] mb-2">Payment method</h6>
                <p className="max-w-[8.75rem] capitalize">
                  {order?.payment_type}
                </p>
              </div>
            </div>
          </div>
          {orderStatus.buttonText ? (
            <ButtonSubmit
              loading={loading}
              disabled={loading}
              text={orderStatus.buttonText}
              onClick={() =>
                orderStatus.goToConfirm
                  ? navigate(
                      ROUTES.DISTRIBUTOR.WAREHOUSE_ORDER_CONFIRM_FOR(
                        warehouse as string,
                        orderId as string
                      )
                    )
                  : dispatch(
                      updateWarehouseOrder({
                        order: orderId as string,
                        warehouse: warehouse as string,
                        status: orderStatus.nextStatus,
                      })
                    )
              }
            />
          ) : null}
        </section>
      </AppLayout>
    </>
  );
};

export default OrderDetails;
