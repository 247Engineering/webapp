import React from 'react'

import mail from '../../../assets/images/mail.svg'

import OnboardingLayout from '../../../components/layouts/OnboardingLayout'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import ButtonText from '../../../components/forms/ButtonText'

const VerifyMail = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.location.href = 'mailto:'
  }

  return (
    <OnboardingLayout>
      <header className="bg-orange-light px-4 pb-[11rem]">
        <h1 className="h1 mb-2 max-w-[15.313rem] text-black">
          Check your mail
        </h1>
        <p className="p text-black-100">
          Verify your mail to proceed with sign up
        </p>
      </header>
      <section className="px-4 py-[1.875rem]">
        <form onSubmit={handleSubmit}>
          <p className="mb-[1.875rem] text-[0.75rem] leading-[1.125rem] text-black">
            An email has been sent to pepsibottle@gmail.com with a link to
            verify your account. If you don't receive an email after some
            minutes, check your spam folder or resend link
          </p>
          <ButtonSubmit
            text={
              <>
                <img
                  src={mail}
                  className="w-[1.25rem] h-[1.25rem] mr-2"
                  alt="mail"
                />{' '}
                Open mail app
              </>
            }
            onClick={handleSubmit}
            className="mb-[1.875rem]"
          />
          <div className="text-center mb-4">
            <ButtonText text="Resend Email" onClick={() => {}} />
          </div>
        </form>
      </section>
    </OnboardingLayout>
  )
}

export default VerifyMail
