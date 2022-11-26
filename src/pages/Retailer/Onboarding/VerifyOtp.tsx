import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import Input from '../../../components/forms/Input'
import LandingLayout from '../../../components/layouts/LandingLayout'

import { useAuth } from '../../../hooks/useAuth'
import { RootState, AppDispatch } from '../../../store'
import { AuthContextType, AuthState } from '../../../types'
import { validateOtp } from '../../../store/features/auth'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { loading, id, phone } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState
  const { login } = useAuth() as AuthContextType
  const [otp, setOtp] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(validateOtp({ phone: phone as string, otp }))
  }

  useEffect(() => {
    if (id) login({ id, type: 'retailer' })
  }, [id, login])

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
              label="OTP (4 Digits)"
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
            disabled={loading || !otp}
            loading={loading}
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
