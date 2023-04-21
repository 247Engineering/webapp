import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";

import noOrders from "../../assets/images/no-orders.svg";
import chevron from "../../assets/images/chevron.svg";

import AppLayout from "../../components/layouts/AppLayout";

import { AppDispatch, RootState } from "../../store";
import { LogisticsState } from "../../types";
import { setOrder, fetchBalance } from "../../store/features/logistics";
import * as ROUTES from "../../routes";
import { refreshToken } from "../../helpers/request";

const Dashboard = () => {
  const tokens = useMemo(
    () => JSON.parse(localStorage.getItem("tokens") as string),
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { order, balance } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken("logistics", tokens?.refresh_token);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const findOrder = async (response: any) => {
      console.log({ findOrderResponse: response });
      if (response.statusCode === 401) {
        refreshToken("logistics", tokens?.refresh_token);
        // setTimeout(() => window.location.reload(), 7000);
      } else {
        dispatch(
          setOrder({
            data: JSON.parse(response.data),
            onSuccess: () => navigate(ROUTES.LOGISTICS.ORDER_PROMPT),
          })
        );
      }
    };

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser!");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
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

      currentSocket.emit("requestOrder", {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      currentSocket.on("foundOrder", findOrder);
    });

    return () => {
      socket?.disconnect();
      socket?.off("foundOrder", findOrder);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppLayout bottomNav logistics={order ? 1 : 0} wallet>
        <div className="flex justify-between items-center p-4 rounded-[8px] bg-grey-light-200">
          <div>
            <h5 className="mb-2 text-[0.875rem] leading-[1.25rem]">Balance</h5>
            <h4 className="text-[1.5rem] leading-[2rem] font-[700]">
              N
              {balance
                ?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                .split(".")[0] || "0"}
              <span className="font-[400] text-[1.25rem] leading-[1.75rem]">
                .
                {balance
                  ?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  .split(".")[1] || "00"}
              </span>
            </h4>
          </div>
          <img src={chevron} alt="chevron right" />
        </div>
        <div className="flex flex-col justify-center items-center mt-[6.125rem]">
          <img src={noOrders} alt="no orders" />
          <h1 className="mt-6 font-[700] text-[1.25rem] leading-[1.75rem]">
            Looking for orders
          </h1>
          <p className="mt-2 text-black-100 text-[1rem] leading-[1.5rem] text-center max-w-[11.938rem]">
            Don't worry we'll get you something soon
          </p>
        </div>
      </AppLayout>
    </>
  );
};

export default Dashboard;
