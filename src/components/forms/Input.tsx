import React, { useState } from 'react'
import { InputProps } from '../../types'
import eye from '../../assets/images/eye.svg'
import caution from '../../assets/images/caution.svg'

const Input = ({
  label,
  options,
  type: initialType,
  value,
  image,
  onChange,
  error,
  errorText,
}: InputProps) => {
  const [type, setType] = useState(initialType)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    onChange(e.target.value)
  }

  return (
    <>
      <label className="label">{label}</label>
      <div className="relative">
        {options ? (
          <select
            className={`select mt-2 ${error ? 'error' : ''}`}
            value={value}
            onChange={handleChange}
          >
            <option disabled></option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`input mt-2 ${error ? 'error' : ''}`}
            type={initialType === 'password' ? type : initialType}
            value={value}
            onChange={handleChange}
          />
        )}
        {initialType === 'password' ? (
          <img
            src={eye}
            alt="toggle show password"
            className="w-[1.25rem] h-[1.25rem] absolute top-[0.813rem] right-[0.625rem]"
            onClick={() => setType(type === 'password' ? 'text' : 'password')}
          />
        ) : null}
        {image ? (
          <img
            src={image}
            alt="icon"
            className="absolute top-[0.7rem] right-[0.625rem]"
          />
        ) : null}
        {error ? (
          <span className="mt-2 text-[0.75rem] leading-[1rem] flex items-center text-black-100">
            <img
              className="w-[0.917rem] h-[0.792rem] mr-[0.542rem]"
              alt="error"
              src={caution}
            />
            {errorText}
          </span>
        ) : null}
      </div>
    </>
  )
}

export default Input
