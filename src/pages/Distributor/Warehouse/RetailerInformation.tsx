import React, { useState, useEffect, useMemo, CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

import AppLayout from "../../../components/layouts/AppLayout";
import Input from "../../../components/forms/Input";
import PhoneNumberInput from "../../../components/forms/PhoneNumberInput";

import { AppDispatch, RootState } from "../../../store";
import {
  completeSaleStep,
  findRetailer,
  createRetailer,
} from "../../../store/features/distributor";
import { DistributorState } from "../../../types";

import * as ROUTES from "../../../routes";

const RetailerInformation = () => {
  const override: CSSProperties = {
    borderColor: "#E34B31",
    background: "transparent",
  };

  const navigate = useNavigate();

  const { warehouse } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { retailer, loading } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [callingCode, setCallingCode] = useState("+234");
  const [mobile, setMobile] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(false);
  const [foundRetailer, setFoundRetailer] = useState(false);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (foundRetailer) {
      dispatch(completeSaleStep(1));
      navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_SALE_FOR(warehouse as string));
    } else {
      dispatch(
        createRetailer({
          fname: firstName,
          lname: lastName,
          phone: (callingCode + mobile).replace("+", ""),
          onSuccess: () => {
            dispatch(completeSaleStep(1));
            navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_SALE_FOR(warehouse as string));
          },
        })
      );
    }
  };

  const canSubmit = useMemo(
    () =>
      [firstName, lastName, callingCode, mobile, isValidMobile].every(
        (data) => !!data
      ),
    [firstName, lastName, callingCode, mobile, isValidMobile]
  );

  useEffect(() => {
    if (isValidMobile && mobile.length === 10) {
      dispatch(findRetailer((callingCode + mobile).replace("+", "")));
    } else {
      setFoundRetailer(false);
    }
  }, [isValidMobile, dispatch, callingCode, mobile]);

  useEffect(() => {
    if (retailer) {
      setFoundRetailer(true);
      setFirstName(retailer.fname);
      setLastName(retailer.lname);
    }
  }, [retailer]);

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
            Tell us about your retailer
          </h1>
          <p className="p text-black-100">
            Fill in the details of the retailer you want to create a sale for
          </p>
        </header>
        <section className="mt-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <PhoneNumberInput
                code={callingCode}
                setCode={setCallingCode}
                setMobile={setMobile}
                mobile={mobile}
                setIsValid={setIsValidMobile}
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="First name"
                  value={firstName}
                  onChange={setFirstName}
                  type="text"
                  disabled={foundRetailer || loading}
                />
              </div>
              <div>
                <Input
                  label="Last name"
                  value={lastName}
                  onChange={setLastName}
                  type="text"
                  disabled={foundRetailer || loading}
                />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                disabled={!canSubmit || loading}
                className="bg-orange text-white button button-small button-primary"
                onClick={handleSubmit}
              >
                {loading ? (
                  <MoonLoader
                    cssOverride={override}
                    size={15.6}
                    color="#E34B31"
                  />
                ) : (
                  "Save"
                )}
              </button>
              <button
                className="button button-small button-primary button-secondary text-orange"
                onClick={() => {
                  navigate(-1);
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </AppLayout>
    </>
  );
};

export default RetailerInformation;
