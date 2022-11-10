import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import Input from '../../../components/forms/Input'
import LandingLayout from '../../../components/layouts/LandingLayout'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Verify OTP</h1>
        <p className="p text-black-100">
          Submit your OTP to confirm your account
        </p>
      </header>
      <section className="mt-[3.75rem]">
        <form onSubmit={handleSubmit}>
          <div className="mb-[12.75rem]">
            <Input
              label="OTP (6 Digits)"
              value={otp}
              onChange={setOtp}
              type="text"
              placeholder="Please enter your OTP"
            />
          </div>
          <ButtonSubmit
            text="Confirm OTP"
            onClick={handleSubmit}
            className="mb-4"
            disabled
          />
          <ButtonSubmit
            text="Cancel"
            onClick={() => {
              navigate(-1)
            }}
            className="bg-[#FFF5F6] text-[#E53451]"
            type="button"
          />
        </form>
      </section>
    </LandingLayout>
  )
}

export default VerifyOtp
