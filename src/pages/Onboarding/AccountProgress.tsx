import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppLayout from '../../components/layouts/AppLayout'
import AccountProgressStep from '../../components/miscellaneous/AccountProgressStep'
import ProgressBar from '../../components/miscellaneous/ProgressBar'

import { RootState } from '../../store'

const AccountProgress = () => {
  const navigate = useNavigate()

  const stepsCompleted = useSelector<RootState>(
    ({ distributor }) => distributor.stepsCompleted,
  ) as number

  return (
    <>
      <AppLayout>
        <header>
          <h1 className="h1 mb-2 text-black">Welcome!</h1>
          <p className="p text-black-100">
            Setting up your 24Seven account, it will only take 10 minutes
          </p>
        </header>
        <section className="mt-8">
          <ProgressBar step={Math.round(stepsCompleted)} totalSteps={3} />
          <AccountProgressStep
            progress={
              stepsCompleted < 1
                ? stepsCompleted < 0.5
                  ? 'none'
                  : 'started'
                : 'done'
            }
            title="Company information"
            text="Company Information"
            onClick={() => {
              navigate('/business-info/form')
            }}
          />
          <AccountProgressStep
            progress={
              stepsCompleted < 2
                ? stepsCompleted < 1.5
                  ? 'none'
                  : 'started'
                : 'done'
            }
            title="Owner information"
            text="Company Information"
            onClick={() => {
              navigate('/business-owner')
            }}
          />
          <AccountProgressStep
            progress={
              stepsCompleted < 3
                ? stepsCompleted < 2.5
                  ? 'none'
                  : 'started'
                : 'done'
            }
            title="Review and submit"
            text="Company Information"
            onClick={() => {
              navigate('/business-owner/review')
            }}
          />
        </section>
      </AppLayout>
    </>
  )
}

export default AccountProgress
