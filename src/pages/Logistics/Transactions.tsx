import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { format } from "date-fns";

import filter from "../../assets/images/filter.svg";
import searchIcon from "../../assets/images/search-alt.svg";
import deliveryIcon from "../../assets/images/delivery-completed.svg";

import AppLayout from "../../components/layouts/AppLayout";
import TransactionSummary from "../../components/miscellaneous/TransactionSummary";
import Status from "../../components/miscellaneous/Status";
import MapModal from "../../components/miscellaneous/MapModal";
import Loader from "../../components/miscellaneous/Loader";

import { AppDispatch, RootState } from "../../store";
import { LogisticsState } from "../../types";
import { fetchDeliveries } from "../../store/features/logistics";
import BackButton from "../../components/forms/BackButton";
import TableFooter from "../../components/tables/TableFooter";
// import * as ROUTES from "../../routes";

const Transactions = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

  const [search, setSearch] = useState("");
  // const [type, setType] = useState("unpaid");
  const [modal, setModal] = useState(false);
  const [delivery] = useState<any>(null);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  return (
    <>
      <AppLayout logistics bottomNav>
        {loading ? <Loader /> : null}
        <div className="flex flex-col h-full relative mt-[-1.5rem] mb-[-4rem] mx-[-1rem]">
          <div className="px-4">
            <BackButton text="" className="mb-[0.667rem]" />
            <header className="mb-4">
              <h1 className="font-bold text-[1.25rem] leading-[1.75rem]">
                Transactions
              </h1>
            </header>

            <div className="flex mb-6">
              <div className="relative mr-2 grow">
                <input
                  className="bg-grey rounded-[50px] p-[0.625rem] pl-[2.75rem] h-full w-full"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <img
                  src={searchIcon}
                  alt="search"
                  className="absolute left-[1.104rem] top-[0.656rem]"
                />
              </div>
              <button className="flex justify-center items-center rounded-[10px] w-[2.5rem] h-[2.5rem] bg-orange">
                <img src={filter} alt="filter" />
              </button>
            </div>

            <section className="pb-20">
              <div className="mb-2">
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
              </div>
              <TableFooter total={10} />
            </section>
          </div>
          {modal ? (
            <MapModal className="h-full" onClose={() => setModal(false)}>
              <div className="px-4 pb-16 pt-6">
                <div className="flex justify-between mb-8">
                  <div>
                    <h5 className="font-bold text-[1.25rem] leading-[1.75rem] mb-2">
                      N{delivery?.delivery_fee.toLocaleString()}
                    </h5>
                    <Status
                      className={`${
                        delivery.paid
                          ? "bg-green-light text-green"
                          : "bg-[#FFEBEE] text-red"
                      } rounded-[10px] py-1 px-2 !text-[0.75rem] !leading-[1rem]`}
                      text={delivery.paid ? "Paid" : "Unpaid"}
                    />
                    <p className="mt-2">
                      {format(
                        new Date(delivery.order_date),
                        "MMM d, yyyy - h:mma"
                      )}
                    </p>
                  </div>
                  <img
                    src={deliveryIcon}
                    alt="delivered"
                    className="self-start"
                  />
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Order ID</h6>
                  <h6 className="font-normal">
                    #{delivery.order_id.replace("ORD_", "")}
                  </h6>
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Delivery Date</h6>
                  <h6 className="font-normal">
                    {format(new Date(delivery.order_date), "MMM d, yyyy")}
                  </h6>
                </div>
                <div className="flex justify-between items-center pb-4 mb-4 font-bold text-[0.75rem] leading-[1rem] border border-solid border-grey-light-100 border-0 border-b">
                  <h6>Customer</h6>
                  <h6 className="font-normal">
                    {delivery.first_name} {delivery.last_name}
                  </h6>
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

export default Transactions;
