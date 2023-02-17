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
  placeholder,
  alternate,
  default: selectDefault,
  prefix,
  suffix,
  disabled,
}: InputProps) => {
  const [type, setType] = useState(initialType)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    let value = e.target.value

    if (initialType === 'number') {
      value = value.replaceAll(/[^0-9.]/g, '')
      value =
        value.startsWith('0') ? value.replace('0', '') : value
    }
    if (prefix) value = value.replace(prefix, '')
    if (suffix) value = value.replace(suffix, '')

    onChange(value)
  }

  return (
    <>
      <label className="label text-black">{label}</label>
      <div className="relative">
        {initialType === 'textarea' ? (
          <textarea
            value={value}
            onChange={handleChange}
            className={`textarea mt-2 ${error ? 'error' : ''}`}
            placeholder={placeholder}
            rows={3}
          ></textarea>
        ) : options ? (
          <select
            className={`select mt-2 ${error ? 'error' : ''} ${
              alternate ? 'alternate' : ''
            }`}
            value={value}
            onChange={handleChange}
          >
            <option value="" disabled>
              {selectDefault || ''}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`input mt-2 ${error ? 'error' : ''}`}
            type={initialType === 'password' ? type : 'text'}
            value={prefix ? prefix + value : suffix ? value + suffix : value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        {initialType === 'password' ? (
          <img
            src={eye}
            alt="toggle show password"
            className="w-[1.25rem] h-[1.25rem] absolute top-[0.95rem] right-[0.625rem]"
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
