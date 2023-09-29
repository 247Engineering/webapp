import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AppLayout from "../../../components/layouts/AppLayout";
import AccountProgressStep from "../../../components/miscellaneous/AccountProgressStep";
import ProgressBar from "../../../components/miscellaneous/ProgressBar";
import Loader from "../../../components/miscellaneous/Loader";

import { RootState, AppDispatch } from "../../../store";
import { DistributorState } from "../../../types";
import { fetchCart } from "../../../store/features/distributor";
import * as ROUTES from "../../../routes";

const CreateSale = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { warehouse } = useParams();

  const { saleStepsCompleted, previousOrder, retailer, loading } =
    useSelector<RootState>(
      ({ distributor }) => distributor
    ) as DistributorState;

  useEffect(() => {
    if (retailer) {
      dispatch(fetchCart(true));
    }
  }, [dispatch, retailer]);

  return (
    <>
      <AppLayout>
        {loading ? <Loader /> : null}
        <header>
          <h1 className="h1 mb-2 text-black">Welcome!</h1>
          <p className="p text-black-100">
            Enter details of the retailer you want to create a sale for
          </p>
        </header>
        <section className="mt-8">
          <ProgressBar
            step={Math.round(saleStepsCompleted as number)}
            totalSteps={2}
          />
          <AccountProgressStep
            progress={
              (saleStepsCompleted as number) < 1
                ? (saleStepsCompleted as number) < 0.5
                  ? "none"
                  : "started"
                : "done"
            }
            title="Retailer information"
            text="Retailer Information"
            onClick={() => {
              navigate(
                ROUTES.DISTRIBUTOR.WAREHOUSE_RETAILER_INFO_FOR(
                  warehouse as string
                )
              );
            }}
          />
          <AccountProgressStep
            progress={
              (saleStepsCompleted as number) < 2
                ? (saleStepsCompleted as number) < 1.5
                  ? "none"
                  : "started"
                : "done"
            }
            title="Create order"
            text="Create Order"
            onClick={() => {
              if ((saleStepsCompleted as number) < 1) {
                toast.error("Enter retailer information first");
              } else {
                navigate(
                  ROUTES.DISTRIBUTOR.WAREHOUSE_STORE_FOR(warehouse as string)
                );
              }
            }}
          />
          {previousOrder?.length ? (
            <AccountProgressStep
              progress="started"
              title="View last orders"
              text="View Last Orders"
              onClick={() =>
                navigate(
                  ROUTES.DISTRIBUTOR.RETAILER_ORDERS_FOR(
                    warehouse as string,
                    retailer?.retailer_id
                  )
                )
              }
            />
          ) : null}
        </section>
      </AppLayout>
    </>
  );
};

export default CreateSale;
