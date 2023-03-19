import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ButtonSubmit from "../components/forms/ButtonSubmit";
import ButtonText from "../components/forms/ButtonText";
import Input from "../components/forms/Input";
import LandingLayout from "../components/layouts/LandingLayout";
import PhoneNumberInput from "../components/forms/PhoneNumberInput";

import { useAuth } from "../hooks/useAuth";
import { signin } from "../store/features/auth";
import { AppDispatch, RootState } from "../store";
import { AuthContextType, AuthState, SignInProps } from "../types";
import * as ROUTES from "../routes";

const SignIn = ({ type, forgotPassword }: SignInProps) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, id } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;
  const { login } = useAuth() as AuthContextType;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [callingCode, setCallingCode] = useState("+234");
  const [isValidMobile, setIsValidMobile] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signin({
        ...(type === "retailer" || type === "logistics"
          ? { phone: (callingCode + mobile).replace("+", "") }
          : { email }),
        password,
        type,
      })
    );
  };

  useEffect(() => {
    if (id) login({ id, type });
  }, [id, login, type]);

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Sign In</h1>
        <p className="p text-black-100">Welcome back</p>
      </header>
      <section className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {type === "retailer" || type === "logistics" ? (
              <PhoneNumberInput
                code={callingCode}
                setCode={setCallingCode}
                setMobile={setMobile}
                mobile={mobile}
                setIsValid={setIsValidMobile}
              />
            ) : (
              <Input
                label="Email address"
                value={email}
                onChange={setEmail}
                type="email"
              />
            )}
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
            />
          </div>
          <ButtonText
            text="Forgot Password?"
            onClick={() => {
              navigate(forgotPassword);
            }}
            className="mb-12"
          />
          <ButtonSubmit
            text="Sign in"
            onClick={handleSubmit}
            className="mb-4"
            disabled={
              loading || (!mobile && !email) || !password || !isValidMobile
            }
            loading={loading}
          />
          {type !== "warehouse" ? (
            <p className="p text-center">
              Don't have an account?{" "}
              <ButtonText
                text="Sign up"
                onClick={() => {
                  navigate(ROUTES.AUTH.ACCOUNT_SELECT);
                }}
                className="font-[400]"
              />
            </p>
          ) : null}
        </form>
      </section>
      <a href="/" className="text-center mt-auto privacy-policy">
        Terms of use. Privacy policy
      </a>
    </LandingLayout>
  );
};

export default SignIn;
