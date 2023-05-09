import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { format } from "date-fns";

import AppLayout from "../../components/layouts/AppLayout";
import TransactionSummary from "../../components/miscellaneous/TransactionSummary";
import MapModal from "../../components/miscellaneous/MapModal";
import Status from "../../components/miscellaneous/Status";

import bank from "../../assets/images/bank.svg";
import withdrawIcon from "../../assets/images/withdraw.svg";

// import { AppDispatch, RootState } from "../../store";
// import { LogisticsState } from "../../types";
// import { setOrder } from "../../store/features/logistics";
// import * as ROUTES from "../../routes";

const Wallet = () => {
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
      <AppLayout logistics bottomNav>
        <div className="flex flex-col h-full relative mt-[-0.5rem] mb-[-4rem] mx-[-1rem]">
          <div className="px-4">
            <div className="w-full bg-grey-light-200 rounded-[8px] p-4 mb-6">
              <p className="mb-2 text-black-100 text-[0.875rem] leading-[1.25rem]">
                Balance
              </p>
              <h4 className="text-[1.5rem] leading-[2rem] font-[700] mb-4">
                N
                {3000000
                  ?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  .split(".")[0] || "0"}
                <span className="font-[400] text-[1.25rem] leading-[1.75rem]">
                  .
                  {3000000
                    ?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    .split(".")[1] || "00"}
                </span>
              </h4>
              <button className="flex items-center rounded-[10px] p-2 pr-4 bg-orange text-white">
                <img src={withdrawIcon} alt="withdraw" className="mr-2" />
                <span className="font-[700] text-[0.75rem] leading-[1rem]">
                  Withdraw
                </span>
              </button>
            </div>

            <section className="pb-20">
              <div className="flex justify-between items-center font-bold mb-6">
                <h5 className="font-[1rem] leading-[1.5rem]">Transactions</h5>
                <button className="text-purple text-[0.875rem] leading-[1.25rem]">
                  View all
                </button>
              </div>
              <TransactionSummary
                date={new Date()}
                successful
                amount={5000}
                onClick={() => setModal(true)}
              />
              <TransactionSummary
                date={new Date()}
                successful={false}
                amount={5000}
                onClick={() => setModal(true)}
              />
              <TransactionSummary
                date={new Date()}
                successful
                amount={5000}
                onClick={() => setModal(true)}
              />
              <TransactionSummary
                date={new Date()}
                successful={false}
                amount={5000}
                onClick={() => setModal(true)}
              />
              <TransactionSummary
                date={new Date()}
                successful
                amount={5000}
                onClick={() => setModal(true)}
              />
              <TransactionSummary
                date={new Date()}
                successful={false}
                amount={5000}
                onClick={() => setModal(true)}
              />
              <TransactionSummary
                date={new Date()}
                successful
                amount={5000}
                onClick={() => setModal(true)}
              />
            </section>
          </div>
          {modal ? (
            <MapModal className="h-full" onClose={() => setModal(false)}>
              <div className="px-4 pb-16 pt-8">
                <div className="flex justify-between mb-8">
                  <div>
                    <h5 className="font-bold text-[1.25rem] leading-[1.75rem] mb-2">
                      N{(3000000).toLocaleString()}
                    </h5>
                    <p className="mt-2 text-black-100 text-[0.875rem] leading-[1.25rem]">
                      {format(new Date(), "MMM d, yyyy - h:mma")}
                    </p>
                  </div>
                  <img
                    src={bank}
                    alt="delivered"
                    className="self-start w-[3rem] h-[3rem]"
                  />
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Bank</h6>
                  <h6>Guaranty Trust Bank</h6>
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Recipient</h6>
                  <div>
                  <h6 className="text-right">
                    Iya Duretti
                  </h6>
                  <p className="font-normal text-black-100 text-right">8084451550</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Payment Status</h6>
                  <Status
                    className={`${
                      true
                        ? "bg-green-light text-green"
                        : "bg-[#FFEBEE] text-red"
                    } rounded-[6px] py-[1px] px-[6px]`}
                    text="Successful"
                  />
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Fee</h6>
                  <h6>N25</h6>
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>New Balance</h6>
                  <h6>N{(30000).toLocaleString()}</h6>
                </div>
              </div>
            </MapModal>
          ) : null}
        </div>
      </AppLayout>
    </>
  );
};

export default Wallet;
