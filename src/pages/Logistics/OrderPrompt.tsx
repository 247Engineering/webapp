import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import clock from "../../assets/images/clock.svg";
import close from "../../assets/images/close-red.svg";
import warehouseMarker from "../../assets/images/warehouse-marker.svg";
import retailerMarker from "../../assets/images/retailer-marker.svg";
import deliveryMarker from "../../assets/images/delivery-marker.svg";

import AppLayout from "../../components/layouts/AppLayout";
import Map from "../../components/miscellaneous/Map";
import MapModal from "../../components/miscellaneous/MapModal";

import { AppDispatch, RootState } from "../../store";
import { LogisticsState } from "../../types";
import { clearOrder, updateOrder } from "../../store/features/logistics";
import * as ROUTES from "../../routes";
import { refreshToken } from "../../helpers/request";

const OrderPrompt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { order } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [position, setPosition] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const tokens = useMemo(
    () => JSON.parse(localStorage.getItem("tokens") as string),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken("logistics", tokens.refresh_token);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const acceptOrder = async (response: any) => {
      console.log({ acceptOrderResponse: response });
      dispatch(
        updateOrder({
          status: "accepted",
          onSuccess: () => navigate(ROUTES.LOGISTICS.ORDER_STATUS),
        })
      );
    };

    const rejectOrder = async (response: any) => {
      console.log({ rejectOrderResponse: response });
      dispatch(clearOrder(() => navigate(ROUTES.LOGISTICS.DASHBOARD)));
    };

    let currentSocket = socket;
    const newSocket = io(`${process.env.REACT_APP_BASE_URL}/orders`, {
      auth: {
        token: tokens?.access_token,
      },
    });
    setSocket(newSocket);
    currentSocket = newSocket;

    currentSocket.on("connect", () => {
      console.log("connected");
    });
    currentSocket.on("disconnect", () => {
      console.log("disconnected");
    });
    currentSocket.on("acceptOrderClient", acceptOrder);
    currentSocket.on("rejectOrderClient", rejectOrder);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppLayout logistics noPadding>
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
          <MapModal>
            <>
              <div className="flex items-center px-[1.167rem] mb-6">
                <img src={clock} alt="ETA" className="mr-[0.667rem]" />
                <div className="flex flex-col font-[700]">
                  <span className="text-[0.75rem] leading-[1rem] text-black-100">
                    ETA
                  </span>
                  <span className="text-[1rem] leading-[1.5rem]">10 mins</span>
                </div>
              </div>
              <div className="px-[1.625rem] flex mb-6">
                <div
                  className="relative flex justify-center items-center mr-3"
                  style={{
                    height: `${
                      document.querySelector(".pick-up-point")?.clientHeight! +
                      72
                    }px`,
                  }}
                >
                  <div className="h-full w-[0.25rem] bg-grey-light-300"></div>
                  <div className="absolute bg-orange h-[0.75rem] w-[0.75rem] rounded-[50%] top-0"></div>
                  <div className="absolute bg-purple h-[0.75rem] w-[0.75rem] rounded-[50%] bottom-0"></div>
                </div>
                <div className="flex flex-col">
                  <div className="mb-[3.75rem] pick-up-point">
                    <h4 className="font-[700] text-black-100 text-[0.75rem] leading-[1rem]">
                      PICK UP POINT #1
                    </h4>
                    <p className="text-[1rem] leading-[1.5rem]">
                      567 Chevron Drive,Chevron, Lekki,
                    </p>
                  </div>
                  <div>
                    <h4 className="font-[700] text-black-100 text-[0.75rem] leading-[1rem]">
                      DROP-OFF POINT
                    </h4>
                    <p className="text-[1rem] leading-[1.5rem]">
                      {order?.retailer_address?.plus_code?.compound_code ||
                        "567 Chevron Drive,Chevron, Lekki"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-solid border-grey-light-100 border-0 border-t flex">
                <button
                  className="rounded-[12px] border border-solid border-red p-[1.109rem] mr-4 flex justify-center items-center"
                  onClick={() =>
                    socket?.emit("rejectOrderServer", {
                      order_id: order?._id,
                    })
                  }
                >
                  <img src={close} alt="cancel" />
                </button>
                <button
                  className="flex-grow flex justify-center items-center p-[0.875rem] bg-orange text-white font-[700] text-[0.875rem] leading-[1.25rem] rounded-[12px]"
                  onClick={() =>
                    socket?.emit("acceptOrderServer", {
                      order_id: order?._id,
                    })
                  }
                >
                  Accept the order
                </button>
              </div>
            </>
          </MapModal>
        </div>
      </AppLayout>
    </>
  );
};

export default OrderPrompt;
