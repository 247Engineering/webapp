import React, { useState, useMemo } from 'react'
// @ts-ignore
import countryFlagEmoji from 'country-flag-emoji'
import countryTelData from 'country-telephone-data'
import { PhoneNumberInputProps } from '../../types'

const PhoneNumberInput = ({ setCode, setMobile }: PhoneNumberInputProps) => {
  const [country, setCountry] = useState('+234')
  const [phoneNumber, setPhoneNumber] = useState('')

  const countryData = useMemo(
    () =>
      countryFlagEmoji.list.map((country: { code: string; emoji: string }) => ({
        code: country.code,
        emoji: country.emoji,
        callingCode: countryTelData.allCountries.find(
          (c) => c.iso2 === country.code.toLowerCase(),
        )?.dialCode,
      })),
    [],
  )

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value)
    setCode(e.target.value)
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
    setMobile(e.target.value)
  }

  return (
    <div className="flex w-full">
      <select
        className="w-1/3 phone-number-select"
        onChange={handleCountryCodeChange}
        value={country}
      >
        {countryData.map(
          (country: { code: string; emoji: string; callingCode: string }) =>
            country.callingCode && (
              <option value={`+${country.callingCode}`} key={country.code}>
                {country.emoji} {`+${country.callingCode}`}
              </option>
            ),
        )}
      </select>
      <input
        className="w-2/3 phone-number-input"
        type="text"
        onChange={handlePhoneNumberChange}
        value={phoneNumber}
      />
    </div>
  )
}

export default PhoneNumberInput
