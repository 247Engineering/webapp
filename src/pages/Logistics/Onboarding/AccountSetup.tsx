import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppLayout from '../../../components/layouts/AppLayout'
import AccountProgressStep from '../../../components/miscellaneous/AccountProgressStep'
import ProgressBar from '../../../components/miscellaneous/ProgressBar'

import { RootState } from '../../../store'
import * as ROUTES from '../../../routes'

const AccountSetup = () => {
  const navigate = useNavigate()

  const stepsCompleted = useSelector<RootState>(
    ({ logistics }) => logistics.stepsCompleted,
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
          <ProgressBar step={Math.round(stepsCompleted)} totalSteps={2} />
          <AccountProgressStep
            progress={
              stepsCompleted < 1
                ? stepsCompleted < 0.5
                  ? 'none'
                  : 'started'
                : 'done'
            }
            title="Vehicle information"
            text="Vehicle Information"
            onClick={() => {
              navigate(ROUTES.DISTRIBUTOR.BUSINESS_INFO_FORM)
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
            title="Payment Information"
            text="Add bank account details for withdrawals"
            onClick={() => {
              navigate(ROUTES.LOGISTICS.ADD_PAYMENT)
            }}
          />

        </section>
      </AppLayout>
    </>
  )
}

export default AccountSetup
