import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import orderProgress from "../../../assets/images/order-progress.svg";
import orderProgressComplete from "../../../assets/images/order-progress-complete.svg";
import collectedProgress from "../../../assets/images/collected-progress.svg";
import collectedProgressComplete from "../../../assets/images/collected-progress-complete.svg";
import deliveryProgress from "../../../assets/images/delivery-progress.svg";
import deliveryProgressComplete from "../../../assets/images/delivery-progress-complete.svg";
import pickupProgress from "../../../assets/images/pickup-progress.svg";
import pickupProgressComplete from "../../../assets/images/pickup-progress-complete.svg";
import warehouse from "../../../assets/images/warehouse-marker.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";
import OtpInput from "../../../components/forms/OtpInput";
import Map from "../../../components/miscellaneous/Map";
import OrderSummary from "../../../components/miscellaneous/OrderSummary";
import IconProgressBar from "../../../components/miscellaneous/IconProgressBar";

import { RootState, AppDispatch } from "../../../store";
import { fetchSingleOrder } from "../../../store/features/retailer";
import { RetailerState, OrderStatus } from "../../../types";
import * as ROUTES from "../../../routes";

const RetailerOrderStatus = () => {
  const { order: orderId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { order } = useSelector<RootState>(
    ({ retailer }) => retailer
  ) as RetailerState;

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId as string));
    const interval = setInterval(() => {
      dispatch(fetchSingleOrder(orderId as string));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, orderId]);

  const statusMap = {
    PENDING: {
      title: "Awaiting confirmation",
      text: "We are checking your order",
      deliveryDate: false,
      images: [
        orderProgress,
        pickupProgress,
        ...(order?.delivery_type === "WH_DELIVERY" ? [deliveryProgress] : []),
        collectedProgress,
      ],
      step: 0,
      totalSteps: 3,
      button: false,
    },
    CONFIRMED: {
      title: "Order confirmed",
      text: "We are preparing your order",
      deliveryDate: true,
      images: [
        orderProgressComplete,
        pickupProgress,
        ...(order?.delivery_type === "WH_DELIVERY" ? [deliveryProgress] : []),
        collectedProgress,
      ],
      step: 0,
      totalSteps: 3,
      button: false,
    },
    PICKUP: {
      title: "Order picked up",
      text: "Mike A has picked up your order",
      deliveryDate: true,
      images: [
        orderProgressComplete,
        pickupProgressComplete,
        ...(order?.delivery_type === "WH_DELIVERY" ? [deliveryProgress] : []),
        collectedProgress,
      ],
      step: 1,
      totalSteps: order?.delivery_type === "WH_DELIVERY" ? 3 : 2,
      button: false,
    },
    DELIVERY: {
      title: "Out for delivery",
      text: "Mike A is headed to your address ",
      deliveryDate: true,
      images: [
        orderProgressComplete,
        pickupProgressComplete,
        deliveryProgressComplete,
        collectedProgress,
      ],
      step: 2,
      totalSteps: 3,
      button: false,
    },
    COMPLETED: {
      title: "Order complete",
      text: "Your order was checked and recieved ",
      deliveryDate: true,
      images: [
        orderProgressComplete,
        pickupProgressComplete,
        ...(order?.delivery_type === "WH_DELIVERY"
          ? [deliveryProgressComplete]
          : []),
        collectedProgressComplete,
      ],
      step: 3,
      totalSteps: 3,
      button: false,
    },
  };

  const orderStatus = statusMap[(order?.status || "PENDING") as OrderStatus];

  return (
    <>
      <AppLayout
        cart
        // hideLogo
        // hideName
        secondaryNav={`Order #${order?.order_id.replace("ORD_", "")}`}
        secondaryNavBack="Orders"
        back={ROUTES.RETAILER.ORDERS}
      >
        <section>
          <div className="rounded-[8px] w-full h-[8.5rem] mb-8 overflow-hidden">
            <Map
              center={{ lat: 9.0765, lng: 7.3986 }}
              lat={9.0765}
              lng={7.3986}
              markers={[{ lat: 9.0765, lng: 7.3986, img: warehouse }]}
            />
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem]">
                {orderStatus.title}
              </h4>
              <p className="text-black-100 text-[0.875rem] leading-[1.25rem]">
                {orderStatus.text}
              </p>
            </div>
            {orderStatus.deliveryDate ? (
              <div className="text-right">
                <h4 className="font-[700] text-[0.75rem] leading-[1rem]">
                  Delivery date
                </h4>
                <p className="text-black-100 text-[0.75rem] leading-[1rem]">
                  {format(order?.delivery_date || new Date(), "E io, MMM")}
                </p>
              </div>
            ) : null}
          </div>
          <div className="mb-8">
            <IconProgressBar
              step={orderStatus.step}
              totalSteps={orderStatus.totalSteps}
              images={orderStatus.images}
            />
          </div>
          {order?.status === "DELIVERY" ||
          (order?.status === "PICKUP" &&
            order?.delivery_type === "RT_PICKUP") ? (
            <div className="mb-8">
              <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
                Confirmation OTP
              </h4>
              <OtpInput
                value={order?.pickup_code || ""}
                onChange={() => {}}
                disabled
              />
            </div>
          ) : null}
          <OrderSummary
            cartItems={
              order?.line_items?.map((item: any) => ({
                id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                image: item.images[0],
              })) || []
            }
            deliveryFee={
              order?.delivery_type === "RT_PICKUP"
                ? 0
                : order?.delivery_fee || 0
            }
            serviceFee={order?.service_fee || 0}
          />
          <h4 className="font-[700] text-[1rem] leading-[1.5rem]">Address</h4>
          <p className="w-[11.75rem] text-[0.875rem] leading-[1.25rem] mb-20 capitalize">
            {order?.delivery_type === "RT_PICKUP"
              ? order.warehouse_address
              : order?.address}
          </p>
          {orderStatus.button ? (
            <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
              <ButtonSubmit
                text="Confirm order received"
                onClick={() => {}}
                className="text-white bg-orange"
              />
            </div>
          ) : null}
        </section>
      </AppLayout>
    </>
  );
};

export default RetailerOrderStatus;
