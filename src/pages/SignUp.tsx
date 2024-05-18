import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
import Checkbox from "../components/forms/Checkbox";
import Button from "../components/forms/Button";

import { useAuth } from "../hooks/useAuth";
import { signup } from "../store/features/auth";
import { AppDispatch, RootState } from "../store";
import { AuthContextType, AuthState } from "../types";
import * as ROUTES from "../routes";

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, id } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;
  const { login } = useAuth() as AuthContextType;

  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [receiveCommunications, setReceiveCommunications] = useState(false);

  const canSubmit = useMemo(
    () =>
      [username, firstName, lastName, email, password, terms].every(
        (data) => !!data
      ),
    [username, firstName, lastName, email, password, terms]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signup({
        username,
        firstName,
        lastName,
        email,
        password,
        onSuccess: () => navigate(ROUTES.PLAY.HURRAY),
      })
    );
  };

  useEffect(() => {
    if (id) login({ id });
  }, [id, login]);

  return (
    <AppLayout className="flex flex-col px-[2.375rem] py-[4.563rem] font-pop">
      <form onSubmit={handleSubmit}>
        <h1 className="text-[1.563rem] font-semibold">Create an Account</h1>
        <p className="text-[0.75rem] text-[#8692A6] leading-7 mb-[1.875rem]">
          Fill in your details to create an account
        </p>
        <div className="mb-[0.625rem]">
          <Input
            label="Username"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={setUsername}
            required
          />
        </div>
        <div className="mb-[0.625rem]">
          <Input
            label="First name"
            placeholder="Enter your first name"
            type="text"
            value={firstName}
            onChange={setFirstname}
            required
          />
        </div>
        <div className="mb-[0.625rem]">
          <Input
            label="Last name"
            placeholder="Enter your last name"
            type="text"
            value={lastName}
            onChange={setLastname}
            required
          />
        </div>
        <div className="mb-[0.625rem]">
          <Input
            label="Email address"
            placeholder="Enter email address"
            type="text"
            value={email}
            onChange={setEmail}
            required
          />
        </div>
        <div className="mb-[0.625rem]">
          <Input
            label="Password"
            placeholder="Enter a password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
        </div>
        <Checkbox
          label="I agree to terms and conditions"
          id="terms"
          checked={terms}
          onChange={() => setTerms(!terms)}
          className="mb-5 pl-2"
        />
        <Button
          text="Register"
          className="font-medium mb-5"
          loading={loading}
          disabled={!canSubmit}
        />
        <div className="flex pl-2">
          <input
            type="checkbox"
            id="newsletter"
            checked={receiveCommunications}
            onChange={() => setReceiveCommunications(!receiveCommunications)}
            className="h-[1.25rem] min-w-[1.25rem]"
          />
          <label
            htmlFor="newsletter"
            className="font-inter text-[0.75rem] text-[#666666] ml-2"
          >
            I would like to receive your newsletter and other promotional
            information
          </label>
        </div>
      </form>
    </AppLayout>
  );
};

export default SignUp;