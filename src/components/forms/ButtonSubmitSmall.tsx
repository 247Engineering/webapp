import React from 'react'
import { ButtonProps } from '../../types'

const ButtonSubmitSmall = ({ text, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      className={`button button-small bg-orange text-white text-center ${
        className ? className : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {text}
    </button>
  )
}

export default ButtonSubmitSmall
