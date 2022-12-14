import React, { useState } from 'react'
import { addDays } from 'date-fns'
import { useSelector } from 'react-redux'

import location from '../../../assets/images/location.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import DatePicker from '../../../components/miscellaneous/DatePicker/DatePicker'

import { RootState } from '../../../store'

const Dashboard = () => {
  const firstName = useSelector<RootState>(
    ({ auth }) => auth.firstName,
  ) as string

  const businessName = useSelector<RootState>(
    ({distributor}) => distributor.businessName
  ) as string

  const [start, setStart] = useState(addDays(new Date(), -30))
  const [end, setEnd] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const setSelectedRange = (dates: { start: Date; end: Date }) => {
    setStart(dates.start)
    setEnd(dates.end)
  }

  return (
    <div onClick={() => setShowCalendar(false)} className="h-full">
      <AppLayout>
        <header>
          <h1 className="h1 mb-2 capitalize text-black">Hi {firstName}!</h1>
          <p className="p text-black-100">
            <img
              src={location}
              className="w-[1.563rem] h-[1.25rem] inline"
              alt="location icon"
            />{' '}
            {businessName} HQ.
          </p>
        </header>
        <section className="mt-6">
          <DatePicker
            setSelectedRange={setSelectedRange}
            start={start}
            end={end}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
          />
        </section>
      </AppLayout>
    </div>
  )
}

export default Dashboard
