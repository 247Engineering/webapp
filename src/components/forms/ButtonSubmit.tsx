import React, { CSSProperties } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import { ButtonProps } from '../../types'

const ButtonSubmit = ({
  text,
  onClick,
  className,
  disabled,
  style,
  loading,
}: ButtonProps) => {
  const override: CSSProperties = {
    borderColor: '#E34B31',
    background: 'transparent',
  }

  return (
    <button
      className={`button-text button bg-orange text-white text-center ${
        className ? className : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {loading ? (
        <MoonLoader cssOverride={override} size={15.6} color="#E34B31" />
      ) : (
        text
      )}
    </button>
  )
}

export default ButtonSubmit
