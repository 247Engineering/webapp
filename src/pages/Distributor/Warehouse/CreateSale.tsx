import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AppLayout from "../../../components/layouts/AppLayout";
import AccountProgressStep from "../../../components/miscellaneous/AccountProgressStep";
import ProgressBar from "../../../components/miscellaneous/ProgressBar";

import { RootState } from "../../../store";
import * as ROUTES from "../../../routes";

const CreateSale = () => {
  const navigate = useNavigate();

  const { warehouse } = useParams();

  const saleStepsCompleted = useSelector<RootState>(
    ({ distributor }) => distributor.saleStepsCompleted
  ) as number;

  return (
    <>
      <AppLayout>
        <header>
          <h1 className="h1 mb-2 text-black">Welcome!</h1>
          <p className="p text-black-100">
            Enter details of the retailer you want to create a sale for
          </p>
        </header>
        <section className="mt-8">
          <ProgressBar step={Math.round(saleStepsCompleted)} totalSteps={2} />
          <AccountProgressStep
            progress={
              saleStepsCompleted < 1
                ? saleStepsCompleted < 0.5
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
              saleStepsCompleted < 2
                ? saleStepsCompleted < 1.5
                  ? "none"
                  : "started"
                : "done"
            }
            title="Create order"
            text="Create Order"
            onClick={() => {
              if (saleStepsCompleted < 1) {
                toast.error("Enter retailer information first")
              } else {
                navigate(
                  ROUTES.DISTRIBUTOR.WAREHOUSE_STORE_FOR(warehouse as string)
                );
              }
            }}
          />
          {/* <AccountProgressStep
            progress={
              saleStepsCompleted < 3
                ? saleStepsCompleted < 2.5
                  ? "none"
                  : "started"
                : "done"
            }
            title="Create sale"
            text="Create Sale"
            onClick={() => {
              navigate(
                ROUTES.DISTRIBUTOR.WAREHOUSE_STORE_FOR(warehouse as string)
              );
            }}
          /> */}
        </section>
      </AppLayout>
    </>
  );
};

export default CreateSale;
