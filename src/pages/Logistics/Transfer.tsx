import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
// import { toast } from "react-toastify";

import AppLayout from "../../components/layouts/AppLayout";
import Input from "../../components/forms/Input";
import ButtonSubmit from "../../components/forms/ButtonSubmit";
import BankSelect from "../../components/forms/BankSelect";

import bank from "../../assets/images/bank.svg";

import {
  // AppDispatch,
  RootState,
} from "../../store";
// import { addVehicleInfo } from "../../store/features/logistics";
import * as ROUTES from "../../routes";
import { LogisticsState } from "../../types";

const Transfer = () => {
  const navigate = useNavigate();

  // const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

  const [dropdown, setDropdown] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // dispatch(
    //   addVehicleInfo({
    //     plate_number: vehicle,
    //     license: file as string,
    //     onSuccess: () => {
    //       toast.success("vehicle info received");
    //       navigate(ROUTES.LOGISTICS.DASHBOARD);
    //     },
    //   })
    // );
  };

  return (
    <div className="h-full" onClick={() => setDropdown(false)}>
      <AppLayout
        alternate
        onClose={() => {
          navigate(-1);
        }}
      >
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Transfer to bank account
          </h1>
          <p className="p text-black-100">
            We process your withdrawals into your bank account
          </p>
        </header>
        <section className="mt-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <BankSelect
                label="Choose bank account"
                dropdown={dropdown}
                setDropdown={setDropdown}
                value={"Kuda Bank - Osarumen Alohan"}
                onChange={() => {}}
                options={[
                  {
                    bankName: "Guaranty Trust Bank",
                    accountName: "Osarumen Alohan",
                    accountNumber: "8084451550",
                    image: bank,
                  },
                  {
                    bankName: "Guaranty Trust Bank",
                    accountName: "Osarumen Alohan",
                    accountNumber: "8084451550",
                    image: bank,
                  },
                ]}
                loading={loading}
                addBank={() => navigate(ROUTES.LOGISTICS.ADD_BANK)}
              />
            </div>
            <div className="mb-[11rem]">
              <Input
                label="Amount to transfer"
                labelRight={"+ N25 processing fee"}
                value={amount}
                onChange={setAmount}
                type="text"
                error={true}
                errorText="You do not have that much in your wallet"
              />
            </div>
            <ButtonSubmit
              text={`Transfer  N${(30000025.9).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
            />
          </form>
        </section>
      </AppLayout>
    </div>
  );
};

export default Transfer;
