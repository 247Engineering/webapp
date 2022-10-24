import React, { useState } from 'react'
import { InputProps } from '../../types'
import eye from '../../assets/images/eye.svg'

const Input = ({
  label,
  options,
  type: initialType,
  value: initialValue,
  image,
  onChange,
}: InputProps) => {
  const [value, setValue] = useState(initialValue)
  const [type, setType] = useState(initialType)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <>
      <label className="label">{label}</label>
      <div className="relative">
        {options ? (
          <select className="select mt-2" value={value} onChange={handleChange}>
            <option disabled></option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="input mt-2"
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
      </div>
    </>
  )
}

export default Input
