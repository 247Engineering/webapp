import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import AccountProgressStep from "../../../components/miscellaneous/AccountProgressStep";
import ProgressBar from "../../../components/miscellaneous/ProgressBar";

import { RootState } from "../../../store";
import * as ROUTES from "../../../routes";
import { LogisticsState } from "../../../types";

const AccountSetup = () => {
  const navigate = useNavigate();

  const { vehicleNumber, walletAccountName } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

  return (
    <>
      <AppLayout>
        <header>
          <h1 className="h1 mb-2 text-black">Welcome!</h1>
          <p className="p text-black-100">
            Setting up your 24Seven account, it will only take 10 minutes
          </p>
        </header>
        <section className="mt-8">
          <ProgressBar step={vehicleNumber || walletAccountName ? 1 : 0} totalSteps={2} />
          <AccountProgressStep
            progress={vehicleNumber ? "done" : "none"}
            title="Vehicle information"
            text="Vehicle Information"
            onClick={() => {
              navigate(ROUTES.LOGISTICS.BUSINESS_INFO_FORM);
            }}
          />
          <AccountProgressStep
            progress={walletAccountName ? "done" : "none"}
            title="Payment Information"
            text="Add bank account details for withdrawals"
            onClick={() => {
              navigate(ROUTES.LOGISTICS.ADD_PAYMENT);
            }}
          />
        </section>
      </AppLayout>
    </>
  );
};

export default AccountSetup;
