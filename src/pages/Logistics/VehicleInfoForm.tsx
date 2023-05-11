import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import AppLayout from "../../components/layouts/AppLayout";
import Input from "../../components/forms/Input";
import DragAndDrop from "../../components/forms/DragAndDrop";
import ButtonSubmit from "../../components/forms/ButtonSubmit";

import { AppDispatch, RootState } from "../../store";
import { addVehicleInfo } from "../../store/features/logistics";
import * as ROUTES from "../../routes";
import { LogisticsState } from "../../types";

const VehicleInfo = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { loading, vehicleNumber, walletAccountName } = useSelector<RootState>(
    ({ logistics }) => logistics
  ) as LogisticsState;

  const [vehicle, setVehicle] = useState("");
  const [file, setFile] = useState<string | ArrayBuffer | null>("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    dispatch(
      addVehicleInfo({
        plate_number: vehicle,
        license: file as string,
        onSuccess: () => {
          toast.success("vehicle info received");
        },
      })
    );
  };

  useEffect(() => {
    navigate(
      ROUTES.LOGISTICS[
        vehicleNumber && walletAccountName ? "DASHBOARD" : "ACCOUNT_SETUP"
      ]
    );
  }, [vehicleNumber, walletAccountName, navigate]);

  return (
    <>
      <AppLayout
        alternate
        onClose={() => {
          navigate(-1);
        }}
      >
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Tell us about your vehicle
          </h1>
          <p className="p text-black-100">
            Setting up your 24Seven account, it will only take 10 minutes
          </p>
        </header>
        <section className="mt-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Vehicle plate number"
                value={vehicle}
                onChange={setVehicle}
                type="text"
              />
            </div>
            <DragAndDrop label="Driver’s license" setData={setFile} />
            <ButtonSubmit
              text="Save and continue"
              onClick={handleSubmit}
              disabled={!vehicle || !file || loading}
              loading={loading}
              className="mt-12"
            />
          </form>
        </section>
      </AppLayout>
    </>
  );
};

export default VehicleInfo;
