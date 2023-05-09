import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import AppLayout from "../../components/layouts/AppLayout";
import Input from "../../components/forms/Input";
import ButtonSubmit from "../../components/forms/ButtonSubmit";

import { AppDispatch, RootState } from "../../store";
import { setupBankAccount } from "../../store/features/logistics";
import * as ROUTES from "../../routes";
import { LogisticsState } from "../../types";

const AddBank = ({ addPayment }: { addPayment?: boolean }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

  const [bvn, setBvn] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("Fermadons LTD");
  const [bankName, setBankName] = useState("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    dispatch(
      setupBankAccount({
        ...(bvn && { bvn }),
        settlementAccountName: accountName,
        settlementAccountNumber: accountNumber,
        settlementBank: bankName,
        onSuccess: () => {
          toast.success("account info received");
          navigate(
            addPayment
              ? ROUTES.LOGISTICS.ACCOUNT_SETUP
              : ROUTES.LOGISTICS.TRANSFER
          );
        },
      })
    );
  };

  return (
    <AppLayout
      alternate
      onClose={() => {
        navigate(-1);
      }}
    >
      <header>
        <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
          Add bank account
        </h1>
        <p className="p text-black-100">
          You can add a bank account to withdraw from your wallet
        </p>
      </header>
      <section className="mt-8 h-full">
        <form onSubmit={handleSubmit}>
          {addPayment ? (
            <div className="mb-4">
              <Input
                label="BVN"
                labelRight="Optional"
                value={bvn}
                onChange={setBvn}
                type="text"
              />
            </div>
          ) : null}
          <div className="mb-4">
            <Input
              label="Account number"
              value={accountNumber}
              onChange={setAccountNumber}
              type="text"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Bank name"
              value={bankName}
              onChange={setBankName}
              type="text"
              options={[{ label: "Kuda Bank", value: "012" }]}
              default="Please select a bank"
            />
          </div>
          <div className="mb-[7rem]">
            <Input
              label="Account name"
              value={accountName}
              onChange={setAccountName}
              type="text"
              disabled
            />
          </div>
          <ButtonSubmit
            text="Add bank account"
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
          />
        </form>
      </section>
    </AppLayout>
  );
};

export default AddBank;
