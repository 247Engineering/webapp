import React from 'react'
import { Country } from 'country-state-city'
import { PhoneNumberInputProps } from '../../types'

const PhoneNumberInput = ({
  code,
  setCode,
  mobile,
  setMobile,
}: PhoneNumberInputProps) => {
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCode(e.target.value)
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value)
  }

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
              ),
          )}
        </select>
        <input
          className="w-2/3 phone-number-input"
          type="text"
          onChange={handlePhoneNumberChange}
          value={mobile}
        />
      </div>
    </>
  )
}

export default PhoneNumberInput
