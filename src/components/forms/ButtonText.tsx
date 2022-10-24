import React from 'react'
import { ButtonProps } from '../../types'

const ButtonText = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`button-text text-purple ${className ? className : ''}`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  )
}

export default ButtonText
