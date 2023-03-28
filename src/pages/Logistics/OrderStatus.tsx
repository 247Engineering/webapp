import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// import marker from "../../assets/images/arrow-marker.svg";
// import warehouse from "../../assets/images/warehouse-logistics.svg";
// import arrow from "../../assets/images/arrow-sm.svg";
// import box from "../../assets/images/box.svg";
import pickup from "../../assets/images/pick-up.svg";
import warehouseMarker from "../../assets/images/warehouse-marker.svg";
import retailerMarker from "../../assets/images/retailer-marker.svg";
import deliveryMarker from "../../assets/images/delivery-marker.svg";

import AppLayout from "../../components/layouts/AppLayout";
import Map from "../../components/miscellaneous/Map";
import MapModal from "../../components/miscellaneous/MapModal";
import OtpInput from "../../components/forms/OtpInput";

import { RootState } from "../../store";
import { LogisticsState } from "../../types";
// import { updateOrderStatus } from "../../store/features/logistics";

// const statusMap = {
//   ENROUTE: {
//     theme: "orange",
//     button: "I have arrived",
//   },
//   ARRIVED: {
//     theme: "orange",
//     button: "Order picked up",
//   },
//   PICKED: {
//     theme: "purple",
//     button: "I have arrived",
//   },
//   DELIVERED: {
//     theme: "orange",
//     button: "I have arrived",
//   },
// };

const OrderStatus = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { order } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

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
          <MapModal onClose={true ? undefined : () => {}}>
            {/* <>
              <div className="px-4 pb-4 font-[700]">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="rounded-[50%] flex justify-center items-center bg-orange text-white text-[0.75rem] leading-[1rem] w-[2rem] h-[2rem] mr-2">
                      1
                    </div>
                    <span className="text-[1rem] leading-[1.5rem]">
                      Pick up
                    </span>
                  </div>
                  <img src={marker} alt="marker" />
                </div>
                <div className="w-full mb-6 flex justify-center">
                  <p className="text-[1.25rem] leading-[1.75rem] text-center w-[90%]">
                    365 Adeyemo Alakija,Victoria Island
                  </p>
                </div>
                <div className="py-[0.969rem] px-[1.313rem] bg-grey rounded-[12px] flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img
                      src={warehouse}
                      alt="warehouse"
                      className="mr-[0.604rem]"
                    />
                    <p className="text-[0.875rem] leading-[1.25rem]">
                      Femadons Victoria Island
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
                <button className="w-full flex justify-center items-center p-[0.875rem] bg-orange text-white font-[700] text-[0.875rem] leading-[1.25rem] rounded-[12px]">
                  I have arrived
                </button>
              </div>
            </> */}
            {/* <>
              <div className="px-4 pb-4 mt-12">
                <div className="flex justify-center items-center mb-6">
                  <img src={pickup} alt="pick-up" />
                </div>
                <div className="flex flex-col items-center mb-6">
                  <h4 className="text-[1.25rem] leading-[1.75rem] font-[700] mb-2 text-center">
                    Confirm pick up
                  </h4>
                  <p className="text-[0.875rem] leading-[1.25rem] text-center">
                    Ask warehouse manager for code to confirm pick up and
                    continue this order.
                  </p>
                </div>
                <OtpInput
                  value={otp}
                  onChange={onChange}
                  className="justify-center mb-14"
                />
                <button className="w-full flex justify-center items-center p-[0.875rem] bg-orange text-white font-[700] text-[0.875rem] leading-[1.25rem] rounded-[12px]">
                  Confirm
                </button>
              </div>
            </> */}
            <>
              <div className="px-4 pb-4 mt-12">
                <div className="flex justify-center items-center mb-6">
                  <img src={pickup} alt="pick-up" />
                </div>
                <div className="flex flex-col items-center mb-6">
                  <h4 className="text-[1.25rem] leading-[1.75rem] font-[700] mb-2 text-center">
                    Confirm pick up
                  </h4>
                  <p className="text-[0.875rem] leading-[1.25rem] text-center">
                    Ask warehouse manager for code to confirm pick up and
                    continue this order.
                  </p>
                </div>
                <OtpInput
                  value={otp}
                  onChange={onChange}
                  className="justify-center mb-14"
                />
                <button className="w-full flex justify-center items-center p-[0.875rem] bg-orange text-white font-[700] text-[0.875rem] leading-[1.25rem] rounded-[12px]">
                  Confirm
                </button>
              </div>
            </>
          </MapModal>
        </div>
      </AppLayout>
    </>
  );
};

export default OrderStatus;
