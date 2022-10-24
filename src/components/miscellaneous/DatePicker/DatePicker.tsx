import React, { useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import arrow from '../../../assets/images/arrow-down2.svg'
import { DatePickerProps } from '../../../types'
import 'react-day-picker/dist/style.css'
import './datepicker.css'

const DatePicker = ({
  setSelectedRange,
  start,
  end,
  showCalendar,
  setShowCalendar,
}: DatePickerProps) => {
  const defaultSelected: DateRange = {
    from: start,
    to: end,
  }
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
  // const [showCalendar, setShowCalendar] = useState(false)

  const handleChange = (range: DateRange | undefined) => {
    setRange(range)
    setSelectedRange({
      start: range?.from,
      end: range?.to,
    })
    if (range?.from && range?.to) setShowCalendar(false)
  }

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <span
        className="flex items-center p bg-grey rounded-[50px] py-[0.375rem] pl-[0.875rem] pr-[0.75rem] w-fit"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {start ? format(start, 'dd/M/yyy') : 'dd/mm/yyyy'} -{' '}
        {end ? format(end, 'dd/M/yyy') : 'dd/mm/yyyy'}
        <img
          src={arrow}
          className="w-[1.042rem] h-[0.595rem] ml-[0.604rem]"
          alt="calendar dropdown"
        />
      </span>
      {showCalendar && (
        <div className="absolute bg-grey rounded-[10px]">
          <DayPicker
            mode="range"
            defaultMonth={start}
            selected={range}
            onSelect={handleChange}
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker
