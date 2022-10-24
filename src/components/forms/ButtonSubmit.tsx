import React from 'react'
import { ButtonProps } from '../../types'

const ButtonSubmit = ({ text, onClick, className, disabled, style }: ButtonProps) => {
  return (
    <button
      className={`button-text button bg-orange text-white text-center ${
        className ? className : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </button>
  )
}

export default ButtonSubmit
