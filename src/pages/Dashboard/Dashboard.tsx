import React, { useState } from 'react'
import { addDays } from 'date-fns'
import { useSelector } from 'react-redux'

import AppLayout from '../../components/layouts/AppLayout'
import DatePicker from '../../components/miscellaneous/DatePicker/DatePicker'
import location from '../../assets/images/location.svg'
import { RootState } from '../../store'

const Dashboard = () => {
  const firstName = useSelector<RootState>(
    ({ auth }) => auth.firstName,
  ) as string

  const [start, setStart] = useState(addDays(new Date(), -30))
  const [end, setEnd] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const setSelectedRange = (dates: { start: Date; end: Date }) => {
    setStart(dates.start)
    setEnd(dates.end)
    console.log({ start, end })
  }

  return (
    <div onClick={() => setShowCalendar(false)}>
      <AppLayout>
        <header>
          <h1 className="h1 mb-2 capitalize">Hi {firstName}!</h1>
          <p className="p">
            <img
              src={location}
              className="w-[1.563rem] h-[1.25rem] inline"
              alt="location icon"
            />{' '}
            Femadons HQ.
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
