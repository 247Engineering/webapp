import React, { useState } from 'react'
import { SortSelectProps } from '../../types'

const SortSelect = ({
  options,
  className,
  value: defaultValue,
  onChange,
}: SortSelectProps) => {
  const [value, setValue] = useState(defaultValue)
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <select
      className={`sort-select ${className ? className : ''}`}
      value={value}
      onChange={handleChange}
    >
      <option disabled value="">
        Sort
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SortSelect
