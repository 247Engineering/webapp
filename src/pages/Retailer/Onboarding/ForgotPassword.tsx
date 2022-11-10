import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import ButtonText from '../../../components/forms/ButtonText'
import LandingLayout from '../../../components/layouts/LandingLayout'
import PhoneNumberInput from '../../../components/forms/PhoneNumberInput'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [callingCode, setCallingCode] = useState('+234')
  const [mobile, setMobile] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Forgot Password?</h1>
        <p className="p text-black-100">
          We will send an OTP to your phone number.
        </p>
      </header>
      <section className="mt-[3.75rem]">
        <form onSubmit={handleSubmit}>
          <div className="mb-[12.75rem]">
            <PhoneNumberInput
              code={callingCode}
              setCode={setCallingCode}
              setMobile={setMobile}
              mobile={mobile}
            />
          </div>
          <ButtonSubmit
            text="Reset password"
            onClick={handleSubmit}
            className="mb-[1.875rem]"
            disabled
          />
          <div className="text-center">
            <ButtonText
              text="Return to Log in"
              onClick={() => {
                navigate('/signin')
              }}
            />
          </div>
        </form>
      </section>
    </LandingLayout>
  )
}

export default ForgotPassword
