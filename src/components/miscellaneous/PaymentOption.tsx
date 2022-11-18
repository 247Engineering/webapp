import React from 'react'

import mastercard from '../../assets/images/mastercard.svg'
import visa from '../../assets/images/visa.svg'
import cash from '../../assets/images/cash.svg'
import check from '../../assets/images/payment-check.svg'

import { PaymentOptionProps } from '../../types'

const paymentOptionMap = {
  mastercard,
  visa,
  cash,
}

const PaymentOption = ({
  option,
  text,
  id,
  name,
  value,
  checked,
  onChange,
}: PaymentOptionProps) => {
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
        <div className="flex items-center py-4 px-3 text-[0.875rem] leading-[1.25rem] border border-solid border-grey-light-100 border-0 border-b mb-2">
          <img
            src={paymentOptionMap[option]}
            alt={`${option} payment option`}
            className="mr-2"
          />
          <span>{text}</span>
          {checked ? (
            <img className="ml-auto" alt="selected" src={check} />
          ) : null}
        </div>
      </label>
    </>
  )
}

export default PaymentOption
