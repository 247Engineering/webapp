import React from 'react'
import AppLayout from '../components/layouts/AppLayout'
import AccountProgressStep from '../components/miscellaneous/AccountProgressStep'
import ProgressBar from '../components/miscellaneous/ProgressBar'

const AccountProgress = () => {
  return (
    <>
      <AppLayout>
        <header>
          <h1 className="h1 mb-2">Welcome!</h1>
          <p className="p">
            Setting up your 24Seven account, it will only take 10 minutes
          </p>
        </header>
        <section className="mt-8">
          <ProgressBar step={1} totalSteps={3} />
          <AccountProgressStep
            progress="done"
            title="Company information"
            text="Company Information"
            onClick={() => {}}
          />
          <AccountProgressStep
            progress="started"
            title="Owner information"
            text="Company Information"
            onClick={() => {}}
          />
          <AccountProgressStep
            progress="none"
            title="Review and submit"
            text="Company Information"
            onClick={() => {}}
          />
        </section>
      </AppLayout>
    </>
  )
}

export default AccountProgress
