import React from 'react'

import { WeightInputProps } from '../../types'

const WeightInput = ({ value, setValue, unit, setUnit }: WeightInputProps) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value)
  }

  return (
    <>
      <label className="label text-black">Weight</label>
      <div className="flex w-full mt-2">
        <input
          className="w-[71.3%] weight-input"
          type="number"
          value={value}
          onChange={handleValueChange}
        />
        <select
          className="w-[28.7%] weight-select"
          value={unit}
          onChange={handleUnitChange}
        >
          <option value="0">kg</option>
          <option value="1">lb</option>
        </select>
      </div>
    </>
  )
}

export default WeightInput
