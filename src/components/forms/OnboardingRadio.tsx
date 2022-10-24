import React from 'react'
import { OnboardingRadioProps } from '../../types'
import radioImg from '../../assets/images/radio.svg'
import radioImgChecked from '../../assets/images/radio-checked.svg'

const OnboardingRadio = ({
  id,
  name,
  img,
  imgChecked,
  textPrimary,
  textSecondary,
  checked,
  value,
  className,
  onChange,
}: OnboardingRadioProps) => {
  return (
    <>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <label htmlFor={id} className="block">
        <div
          className={`flex justify-between items-center onboarding-radio ${
            checked ? 'checked' : ''
          } ${className}`}
        >
          <div className="flex">
            <img
              src={checked ? imgChecked : img}
              className="w-[2rem] h-[2rem] mr-2"
              alt={name}
            />
            <div className="flex flex-col h-full justify-between">
              <p className="font-[700] leading-[1.25rem] text-[0.875rem]">
                {textPrimary}
              </p>
              <p className="font-[400] leading-[0.875rem] text-[0.625rem]">
                {textSecondary}
              </p>
            </div>
          </div>
          <img
            src={checked ? radioImgChecked : radioImg}
            className="w-[1.25rem] h-[1.25rem]"
            alt="radio input"
          />
        </div>
      </label>
    </>
  )
}

export default OnboardingRadio
