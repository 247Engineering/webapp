import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import OtpInput from "../../../components/forms/OtpInput";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";

const ConfirmPickup = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("4444");

  const onChange = (value: string) => setOtp(value);

  const handleSubmit = () => {};

  return (
    <div className="h-full">
      <AppLayout alternate onClose={() => navigate(-1)}>
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Confirm pickup
          </h1>
          <p className="p text-black-100">
            Please share the PIN below with the trade agent
          </p>
        </header>
        <section className="mt-8 h-full flex flex-col text-black">
          <form onSubmit={handleSubmit}>
            <OtpInput value={otp} onChange={onChange} />
            <ButtonSubmit
              text="Submit"
              disabled={true}
              onClick={handleSubmit}
              className="mt-[100%]"
            />
          </form>
        </section>
      </AppLayout>
    </div>
  );
};

export default ConfirmPickup;
