import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { format } from "date-fns";

import AppLayout from "../../components/layouts/AppLayout";
import DeliverySummary from "../../components/miscellaneous/DeliverySummary";
import MapModal from "../../components/miscellaneous/MapModal";
import Status from "../../components/miscellaneous/Status";

import deliveryIcon from "../../assets/images/delivery-completed.svg";

// import { AppDispatch, RootState } from "../../store";
// import { LogisticsState } from "../../types";
// import { setOrder } from "../../store/features/logistics";
// import * as ROUTES from "../../routes";

const Summary = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  // const { order } = useSelector<RootState>(
  //   ({ product }) => product
  // ) as LogisticsState;

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  return (
    <>
      <AppLayout logistics>
        <div className="flex flex-col h-full relative mt-[-0.5rem] mb-[-4rem] mx-[-1rem]">
          <div className="px-4">
            <div className="w-full bg-grey-light-200 rounded-[8px] p-4 mb-6">
              <p className="mb-2 text-black-100 text-[0.875rem] leading-[1.25rem]">
                Unpaid balance
              </p>
              <h4 className="text-[1.5rem] leading-[2rem] font-bold">
                N{(30000).toLocaleString()}
              </h4>
            </div>

            <section>
              <div className="flex justify-between items-center font-bold mb-6">
                <h5 className="font-[1rem] leading-[1.5rem]">
                  Recent Deliveries
                </h5>
                <button className="text-purple text-[0.875rem] leading-[1.25rem]">
                  View all
                </button>
              </div>
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Delivered"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Cancelled"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Delivered"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Cancelled"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Delivered"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Cancelled"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Delivered"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Cancelled"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Delivered"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Cancelled"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Delivered"
                amount={5000}
                onClick={() => setModal(true)}
              />
              <DeliverySummary
                id="1111111"
                date={new Date()}
                status="Cancelled"
                amount={5000}
                onClick={() => setModal(true)}
              />
            </section>
          </div>
          {modal ? (
            <MapModal className="h-full" onClose={() => setModal(false)}>
              <div className="px-4 pb-16 pt-6">
                <div className="flex justify-between mb-8">
                  <div>
                    <h5 className="font-bold text-[1.25rem] leading-[1.75rem] mb-2">
                      N{(300).toLocaleString()}
                    </h5>
                    <Status
                      className={`${
                        true
                          ? "bg-green-light text-green"
                          : "bg-[#FFEBEE] text-red"
                      } rounded-[10px] py-1 px-2 !text-[0.75rem] !leading-[1rem]`}
                      text="Paid"
                    />
                    <p className="mt-2">{format(new Date(), "MMM d, yyyy - h:mma")}</p>
                  </div>
                  <img src={deliveryIcon} alt="delivered" className="self-start" />
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Order ID</h6>
                  <h6 className="font-normal">#1111111</h6>
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Delivery Date</h6>
                  <h6 className="font-normal">{format(new Date(), "MMM d, yyyy")}</h6>
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Customer</h6>
                  <h6 className="font-normal">Iya Duretti</h6>
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Delivery Status</h6>
                  <Status
                      className={`${
                        true
                          ? "bg-green-light text-green"
                          : "bg-[#FFEBEE] text-red"
                      } rounded-[6px] py-[1px] px-[6px]`}
                      text="Delivered"
                    />
                </div>
              </div>
            </MapModal>
          ) : null}
        </div>
      </AppLayout>
    </>
  );
};

export default Summary;
