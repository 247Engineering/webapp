import React, { useState } from "react";
import { Country } from "country-state-city";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
import { PhoneNumberInputProps } from "../../types";

const PhoneNumberInput = ({
  code,
  setCode,
  mobile,
  setMobile,
  setIsValid,
}: PhoneNumberInputProps) => {
  const [isoCode, setIsoCode] = useState("NG");

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let country = Country.getAllCountries().find(
      (country) => `+${country.phonecode}` === e.target.value
    );
    setCode(e.target.value);
    setIsoCode(country?.isoCode as string);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneNumber = parsePhoneNumber(e.target.value, isoCode as CountryCode);
    setMobile(
      e.target.value.startsWith("0")
        ? e.target.value.replace("0", "")
        : e.target.value
    );
    setIsValid(phoneNumber?.isValid() as boolean);
  };

  return (
    <>
      <label className="label text-black">Phone number</label>
      <div className="flex w-full mt-2">
        <select
          className="w-1/3 phone-number-select"
          onChange={handleCountryCodeChange}
          value={code}
        >
          {Country.getAllCountries().map(
            (country) =>
              country.phonecode && (
                <option value={`+${country.phonecode}`} key={country.isoCode}>
                  {country.flag} {`+${country.phonecode}`}
                </option>
              )
          )}
        </select>
        <input
          className="w-2/3 phone-number-input"
          type="number"
          onChange={handlePhoneNumberChange}
          value={mobile}
        />
      </div>
    </>
  );
};

export default PhoneNumberInput;
