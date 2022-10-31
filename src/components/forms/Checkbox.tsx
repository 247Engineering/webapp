import React, { useState } from 'react'
import { CheckboxProps } from '../../types'

const Checkbox = ({
  label,
  id,
  checked: defaultChecked,
  onChange,
  className
}: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className={`flex ${className ? className : ""}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => {
          setChecked(!checked)
          onChange()
        }}
        className="h-[20px] w-[20px]"
      />
      <label htmlFor={id} className="p ml-3 text-black">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
