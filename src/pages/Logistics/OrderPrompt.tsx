import React from "react";
// import { useDispatch, useSelector } from "react-redux";

import clock from "../../assets/images/clock.svg";
import close from "../../assets/images/close-red.svg";

import AppLayout from "../../components/layouts/AppLayout";
import Map from "../../components/miscellaneous/Map";
import MapModal from "../../components/miscellaneous/MapModal";

// import { AppDispatch, RootState } from "../../store";
// import { ProductState } from "../../types";
// import {
//   fetchAllProducts,
//   searchStoreProducts,
// } from "../../store/features/product";

const OrderPrompt = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const { products } = useSelector<RootState>(
  //   ({ product }) => product
  // ) as ProductState;

  // useEffect(() => {}, []);

  return (
    <>
      <AppLayout logistics noPadding>
        <div className="flex flex-col h-full relative">
          <div className="flex-grow">
            <Map
              center={{ lat: 9.0765, lng: 7.3986 }}
              lat={9.0765}
              lng={7.3986}
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
                      567 Chevron Drive,Chevron, Lekki
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-solid border-grey-light-100 border-0 border-t flex">
                <button className="rounded-[12px] border border-solid border-red p-[1.109rem] mr-4 flex justify-center items-center">
                  <img src={close} alt="cancel" />
                </button>
                <button className="flex-grow flex justify-center items-center p-[0.875rem] bg-orange text-white font-[700] text-[0.875rem] leading-[1.25rem] rounded-[12px]">
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
