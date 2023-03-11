import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/layouts/AppLayout";
import Input from "../../components/forms/Input";
import ButtonSubmit from "../../components/forms/ButtonSubmit";
import LocationInput from "../../components/forms/LocationInput";

import { AppDispatch, RootState } from "../../store";
import { Address, RetailerState } from "../../types";
import {
  clearRetailerStamp,
  addBusinessInfo,
} from "../../store/features/retailer";
import * as ROUTES from "../../routes";

const BusinessInfo = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { loading, retailerStamp } = useSelector<RootState>(
    ({ retailer }) => retailer
  ) as RetailerState;

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState<Address | null>(null);
  const [locationDropdown, setLocationDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addBusinessInfo({
        fname,
        lname,
        email,
        address: location as Address,
        business_name: businessName,
      })
    );
  };

  const canSubmit = useMemo(
    () => [fname, lname, businessName, location].every((data) => !!data),
    [fname, lname, businessName, location]
  );

  useEffect(() => {
    if (retailerStamp) navigate(ROUTES.RETAILER.DASHBOARD);
    return () => {
      dispatch(clearRetailerStamp());
    };
  }, [retailerStamp, dispatch, navigate]);

  return (
    <div onClick={() => setLocationDropdown(false)} className="h-full">
      <AppLayout
        alternate
        onClose={() => {
          navigate(-1);
        }}
      >
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Tell us about your business
          </h1>
          <p className="p text-black-100">
            Setting up your 24Seven account, it will only take 10 minutes
          </p>
        </header>
        <section className="mt-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="First name"
                  onChange={setFname}
                  value={fname}
                  type="text"
                />
              </div>
              <div>
                <Input
                  label="Last name"
                  onChange={setLname}
                  value={lname}
                  type="text"
                />
              </div>
            </div>
            <div className="mb-4">
              <Input
                label="Email address"
                value={email}
                onChange={setEmail}
                type="email"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Business name"
                value={businessName}
                onChange={setBusinessName}
                type="text"
              />
            </div>
            <div className="mb-4">
              <LocationInput
                label="Address"
                setLocation={setLocation}
                dropdown={locationDropdown}
                setDropdown={setLocationDropdown}
              />
            </div>
            <ButtonSubmit
              text="Save and continue"
              onClick={handleSubmit}
              className="mt-12"
              disabled={!canSubmit || loading}
              loading={loading}
            />
          </form>
        </section>
      </AppLayout>
    </div>
  );
};

export default BusinessInfo;
