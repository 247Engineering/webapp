import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ButtonSubmit from "../../../components/forms/ButtonSubmit";
import Input from "../../../components/forms/Input";
import LandingLayout from "../../../components/layouts/LandingLayout";

import { useAuth } from "../../../hooks/useAuth";
import { RootState, AppDispatch } from "../../../store";
import { AuthContextType, AuthState } from "../../../types";
import {
  validateOtp,
  validatePasswordResetOtp,
  passwordStampReset,
} from "../../../store/features/auth";
import * as ROUTES from "../../../routes";

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, id, phone, resetPasswordStamp } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;

  const { login } = useAuth() as AuthContextType;
  const passwordResetToken = searchParams.get("token");

  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordResetToken) {
      dispatch(validateOtp({ phone: phone as string, otp, user: "retailer" }));
    } else {
      dispatch(
        validatePasswordResetOtp({
          reset_token: passwordResetToken as string,
          otp,
          user: "retailer",
        })
      );
    }
  };

  useEffect(() => {
    if (id) login({ id, type: "retailer" });
  }, [id, login]);

  useEffect(() => {
    if (resetPasswordStamp) {
      navigate({
        pathname: ROUTES.AUTH.RESET_PASSWORD,
        search: createSearchParams({
          token: passwordResetToken as string,
          user: "retailer",
        }).toString(),
      });
    }

    return () => {
      dispatch(passwordStampReset());
    };
  }, [resetPasswordStamp, passwordResetToken, dispatch, navigate]);

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Verify OTP</h1>
        <p className="p text-black-100">
          Submit your OTP to confirm your account
        </p>
      </header>
      <section className="mt-[3.75rem]">
        <form onSubmit={handleSubmit}>
          <div className="mb-[12.75rem]">
            <Input
              label="OTP (4 Digits)"
              value={otp}
              onChange={setOtp}
              type="text"
              placeholder="Please enter your OTP"
            />
          </div>
          <ButtonSubmit
            text="Confirm OTP"
            onClick={handleSubmit}
            className="mb-4"
            disabled={loading || !otp}
            loading={loading}
          />
          <ButtonSubmit
            text="Cancel"
            onClick={() => {
              navigate(-1);
            }}
            className="bg-[#FFF5F6] text-[#E53451]"
            type="button"
          />
        </form>
      </section>
    </LandingLayout>
  );
};

export default VerifyOtp;
