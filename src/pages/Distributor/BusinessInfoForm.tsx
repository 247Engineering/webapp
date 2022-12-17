import React, { useState, useEffect, useMemo } from "react";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/layouts/AppLayout";
import Input from "../../components/forms/Input";
import DragAndDrop from "../../components/forms/DragAndDrop";
import ButtonSubmit from "../../components/forms/ButtonSubmit";

import { AppDispatch, RootState } from "../../store";
import { DistributorState } from "../../types";
import {
  completeStep,
  updateDistributor,
} from "../../store/features/distributor";
import * as ROUTES from "../../routes";

const BusinessInfo = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const distributor = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [business, setBusiness] = useState(distributor.businessName || "");
  const [address, setAddress] = useState(distributor.address || "");
  const [city, setCity] = useState(distributor.city || "");
  const [country, setCountry] = useState(distributor.country || "");
  const [state, setState] = useState(distributor.state || "");
  const [cac, setCac] = useState<string | ArrayBuffer | null>(
    distributor.cac || ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(completeStep(1));
    navigate(ROUTES.DISTRIBUTOR.ACCOUNT_SETUP);
  };

  const canSubmit = useMemo(
    () =>
      [business, address, city, country, state, cac].every((data) => !!data),
    [business, address, city, country, state, cac]
  );
  console.log({ canSubmit, business, address, city, country, state, cac });

  useEffect(() => {
    if ([business, address, city, country, state, cac].some((data) => !!data)) {
      dispatch(
        updateDistributor({
          businessName: business,
          address,
          city,
          country,
          state,
          cac: cac as string,
        })
      );
      dispatch(
        completeStep(
          [business, address, city, country, state, cac].every((data) => !!data)
            ? 1
            : 0.5
        )
      );
    }
  }, [business, address, city, country, state, cac, dispatch]);

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
            Tell us about your business
          </h1>
          <p className="p text-black-100">
            Setting up your 24Seven account, it will only take 10 minutes
          </p>
        </header>
        <section className="mt-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Business name"
                value={business}
                onChange={setBusiness}
                type="text"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Address"
                value={address}
                onChange={setAddress}
                type="text"
              />
            </div>
            <div className="mb-4">
              <Input label="City" value={city} onChange={setCity} type="text" />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Country"
                  options={Country.getAllCountries().map((country) => ({
                    value: country.isoCode,
                    label: country.name,
                  }))}
                  onChange={setCountry}
                  value={country}
                />
              </div>
              <div>
                <Input
                  label="State"
                  options={State.getStatesOfCountry(country).map((state) => ({
                    value: state.name,
                    label: state.name,
                  }))}
                  onChange={setState}
                  value={state}
                />
              </div>
            </div>
            <DragAndDrop
              label="Company verification document (CAC)"
              setData={setCac}
              // data={cac as string}
            />
            <ButtonSubmit
              text="Save and continue"
              onClick={handleSubmit}
              className="mt-12"
              disabled={!canSubmit}
            />
          </form>
        </section>
      </AppLayout>
    </>
  );
};

export default BusinessInfo;
