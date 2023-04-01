import React, { useState, useEffect, CSSProperties } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";

import marker from "../../assets/images/arrow-marker.svg";
import warehouse from "../../assets/images/warehouse-logistics.svg";
import retailer from "../../assets/images/retailer-plain.svg";
import arrow from "../../assets/images/arrow-sm.svg";
import box from "../../assets/images/box.svg";
import pickup from "../../assets/images/pick-up.svg";
import delivery from "../../assets/images/delivery-purple.svg";
import warehouseMarker from "../../assets/images/warehouse-marker.svg";
import retailerMarker from "../../assets/images/retailer-marker.svg";
import deliveryMarker from "../../assets/images/delivery-marker.svg";

import AppLayout from "../../components/layouts/AppLayout";
import Map from "../../components/miscellaneous/Map";
import MapModal from "../../components/miscellaneous/MapModal";
import OtpInput from "../../components/forms/OtpInput";

import { RootState, AppDispatch } from "../../store";
import { LogisticsState } from "../../types";
import { updateOrderStatus, clearOrder } from "../../store/features/logistics";
import * as ROUTES from "../../routes";

const override: CSSProperties = {
  borderColor: "#E34B31",
  background: "transparent",
};

const OrderStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { order, loading, orderStatus } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [position, setPosition] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const onChange = (value: string) => setOtp(value);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
    // eslint-disable-next-line
  }, []);

  const statusMap = {
    ENROUTE: {
      theme: "orange",
      text: "Pick up",
      number: 1,
      button: "I have arrived",
      hasOtp: false,
      onClick: () =>
        dispatch(
          updateOrderStatus({
            order_status: "ARRIVED",
            order: order._id,
            onSuccess: () => toast.success("order status updated"),
          })
        ),
      onSubmit: () => {},
    },
    ARRIVED: {
      theme: "orange",
      text: "Pick up",
      number: 1,
      button: "Order picked up",
      hasOtp: true,
      onClick: () => setShowOtp(true),
      onSubmit: () =>
        dispatch(
          updateOrderStatus({
            order_status: "PICKED",
            order: order._id,
            pickup_code: otp,
            onSuccess: () => {
              setOtp("");
              setShowOtp(false);
              toast.success("order status updated");
            },
          })
        ),
    },
    PICKED: {
      theme: "purple",
      button: "I have arrived",
      text: "Delivery",
      number: 2,
      hasOtp: false,
      onClick: () =>
        dispatch(
          updateOrderStatus({
            order_status: "RT_DELIVERED",
            order: order._id,
            onSuccess: () => toast.success("order status updated"),
          })
        ),
      onSubmit: () => {},
    },
    RT_DELIVERED: {
      theme: "purple",
      text: "Delivery",
      number: 2,
      hasOtp: true,
      button: "Order delivered",
      onClick: () => setShowOtp(true),
      onSubmit: () =>
        dispatch(
          updateOrderStatus({
            order_status: "DELIVERED",
            order: order._id,
            delivery_code: otp,
            onSuccess: () => {
              toast.success("delivery completed");
              dispatch(clearOrder(() => navigate(ROUTES.LOGISTICS.DASHBOARD)));
            },
          })
        ),
    },
    DELIVERED: {
      theme: "purple",
      text: "Delivery",
      number: 2,
      hasOtp: false,
      button: "Order delivered",
      onClick: () => {},
      onSubmit: () => {},
    },
  };

  return (
    <>
      <AppLayout logistics={order ? 1 : 0} noPadding>
        <div className="flex flex-col h-full relative">
          <div className="flex-grow">
            <Map
              center={{
                lat: order?.location?.latitude || 9.0765,
                lng: order?.location?.longitude || 7.3986,
              }}
              markers={[
                {
                  lat: position?.lat as number,
                  lng: position?.lon as number,
                  img: deliveryMarker,
                },
                {
                  lat: order?.location?.latitude || 9.0765,
                  lng: order?.location?.longitude || 7.3986,
                  img: warehouseMarker,
                },
                {
                  lat: order?.location?.latitude || 9.0765,
                  lng: order?.location?.longitude || 7.3986,
                  img: retailerMarker,
                },
              ]}
            />
          </div>
          <MapModal
            onClose={
              statusMap[orderStatus].hasOtp && showOtp
                ? () => setShowOtp(false)
                : undefined
            }
          >
            {!showOtp ? (
              <>
                <div className="px-4 pb-4 font-[700]">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div
                        className={`rounded-[50%] flex justify-center items-center bg-${statusMap[orderStatus].theme} text-white text-[0.75rem] leading-[1rem] w-[2rem] h-[2rem] mr-2`}
                      >
                        {statusMap[orderStatus].number}
                      </div>
                      <span className="text-[1rem] leading-[1.5rem]">
                        {statusMap[orderStatus].text}
                      </span>
                    </div>
                    <img src={marker} alt="marker" />
                  </div>
                  <div className="w-full mb-6 flex justify-center">
                    <p className="text-[1.25rem] leading-[1.75rem] text-center w-[90%]">
                      {["PICKED", "RT_DELIVERED"].includes(orderStatus)
                        ? order?.retailer_formatted_address || "N/A"
                        : order?.warehouse_details
                            ?.warehouse_formatted_address || "N/A"}
                    </p>
                  </div>
                  <div className="py-[0.969rem] px-[1.313rem] bg-grey rounded-[12px] flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <img
                        src={
                          ["PICKED", "RT_DELIVERED"].includes(orderStatus)
                            ? retailer
                            : warehouse
                        }
                        alt="warehouse"
                        className="mr-[0.604rem]"
                      />
                      <p className="text-[0.875rem] leading-[1.25rem] max-w-[10.875rem]">
                        {["PICKED", "RT_DELIVERED"].includes(orderStatus)
                          ? order?.retailer_name || "N/A"
                          : order?.warehouse_details?.name || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[0.875rem] leading-[1.25rem] mr-[0.595rem]">
                        1
                      </span>
                      <img src={box} alt="box" className="mr-[0.448rem]" />
                      <img src={arrow} alt="arrow" className="" />
                    </div>
                  </div>
                  <button
                    className={`w-full flex justify-center items-center p-[0.875rem] bg-${statusMap[orderStatus].theme} text-white font-[700] text-[0.875rem] leading-[1.25rem] rounded-[12px]`}
                    onClick={statusMap[orderStatus].onClick}
                    disabled={loading}
                  >
                    {loading ? (
                      <MoonLoader
                        cssOverride={override}
                        size={15.6}
                        color="#E34B31"
                      />
                    ) : (
                      statusMap[orderStatus].button
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="px-4 pb-4 mt-12">
                  <div className="flex justify-center items-center mb-6">
                    <img
                      src={orderStatus !== "RT_DELIVERED" ? pickup : delivery}
                      alt="pick-up"
                    />
                  </div>
                  <div className="flex flex-col items-center mb-6">
                    <h4 className="text-[1.25rem] leading-[1.75rem] font-[700] mb-2 text-center">
                      Confirm{" "}
                      {orderStatus !== "RT_DELIVERED" ? "pick up" : "delivery"}
                    </h4>
                    <p className="text-[0.875rem] leading-[1.25rem] text-center">
                      {orderStatus !== "RT_DELIVERED"
                        ? "Ask warehouse manager for code to confirm pick up and continue this order."
                        : "Ask customer for code to confirm delivery and complete this order."}
                    </p>
                  </div>
                  <OtpInput
                    value={otp}
                    onChange={onChange}
                    className="justify-center mb-14"
                  />
                  <button
                    className={`w-full flex justify-center items-center p-[0.875rem] bg-${statusMap[orderStatus].theme} text-white font-[700] text-[0.875rem] leading-[1.25rem] rounded-[12px]`}
                    onClick={statusMap[orderStatus].onSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <MoonLoader
                        cssOverride={override}
                        size={15.6}
                        color="#E34B31"
                      />
                    ) : (
                      "Confirm"
                    )}
                  </button>
                </div>
              </>
            )}
          </MapModal>
        </div>
      </AppLayout>
    </>
  );
};

export default OrderStatus;
