import React from 'react'

import mastercard from '../../assets/images/mastercard.svg'
import visa from '../../assets/images/visa.svg'
import cash from '../../assets/images/cash.svg'
import transfer from '../../assets/images/transfer.svg'
import card from '../../assets/images/card.svg'
import check from '../../assets/images/payment-check.svg'

import { PaymentOptionProps } from '../../types'

const paymentOptionMap = {
  mastercard,
  visa,
  cash,
  transfer,
  card,
  split: transfer
}

const PaymentOption = ({
  option,
  text,
  id,
  name,
  value,
  checked,
  onChange,
  className,
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
        <div
          className={`flex items-center py-4 px-3 text-[0.875rem] leading-[1.25rem] border border-solid border-grey-light-100 border-0 border-b ${
            className ? className : ''
          }`}
        >
          <img
            src={
              paymentOptionMap[
                option as 'mastercard' | 'visa' | 'cash' | 'transfer' | 'card' | 'split'
              ]
            }
            alt={`${option} payment option`}
            className="mr-2 h-[1.25rem] w-[1.25rem]"
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
