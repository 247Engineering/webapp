import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ButtonSubmit from "../../../components/forms/ButtonSubmit";
import ButtonText from "../../../components/forms/ButtonText";
import LandingLayout from "../../../components/layouts/LandingLayout";
import PhoneNumberInput from "../../../components/forms/PhoneNumberInput";

import * as ROUTES from "../../../routes";
import { RootState, AppDispatch } from "../../../store";
import { AuthState } from "../../../types";
import {
  requestPasswordReset,
  passwordStampReset,
} from "../../../store/features/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, resetPasswordStamp } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;

  const [callingCode, setCallingCode] = useState("+234");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      requestPasswordReset({
        phone: (callingCode + mobile).replace("+", ""),
        user: "logistics",
      })
    );
  };

  useEffect(() => {
    if (resetPasswordStamp) {
      toast.success("an otp has been sent to your phone number");
      navigate({
        pathname: ROUTES.RETAILER.VERIFY_OTP,
        search: createSearchParams({
          token: resetPasswordStamp as string,
        }).toString(),
      });
    }

    return () => {
      dispatch(passwordStampReset());
    };
  }, [resetPasswordStamp, dispatch, navigate]);

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Forgot Password?</h1>
        <p className="p text-black-100">
          We will send an OTP to your phone number.
        </p>
      </header>
      <section className="mt-[3.75rem]">
        <form onSubmit={handleSubmit}>
          <div className="mb-[12.75rem]">
            <PhoneNumberInput
              code={callingCode}
              setCode={setCallingCode}
              setMobile={setMobile}
              mobile={mobile}
            />
          </div>
          <ButtonSubmit
            text="Reset password"
            onClick={handleSubmit}
            className="mb-[1.875rem]"
            disabled={loading || !mobile}
            loading={loading}
          />
          <div className="text-center">
            <ButtonText
              text="Return to Log in"
              onClick={() => {
                navigate(ROUTES.RETAILER.SIGNIN);
              }}
            />
          </div>
        </form>
      </section>
    </LandingLayout>
  );
};

export default ForgotPassword;
