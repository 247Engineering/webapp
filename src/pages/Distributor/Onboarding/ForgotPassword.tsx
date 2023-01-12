import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import ButtonText from '../../../components/forms/ButtonText'
import Input from '../../../components/forms/Input'
import LandingLayout from '../../../components/layouts/LandingLayout'

import * as ROUTES from '../../../routes'
import { RootState, AppDispatch } from '../../../store'
import { AuthState } from '../../../types'
import {
  requestPasswordReset,
  passwordStampReset,
} from '../../../store/features/auth'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { loading, resetPasswordStamp } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState

  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(requestPasswordReset({ email, user: "distributor" }))
  }

  useEffect(() => {
    if (resetPasswordStamp)
      toast.success('password reset link has been sent to your mail')

    return () => {
      dispatch(passwordStampReset())
    }
  }, [resetPasswordStamp, dispatch])

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Forgot Password?</h1>
        <p className="p text-black-100">
          We sent an email to pepsibottling@gmail.com with instructions on how
          to reset password
        </p>
      </header>
      <section className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-[12.75rem]">
            <Input
              label="Email address"
              value={email}
              onChange={setEmail}
              type="text"
            />
          </div>
          <ButtonSubmit
            text="Reset password"
            onClick={handleSubmit}
            className="mb-[1.875rem]"
            disabled={!email || loading}
            loading={loading}
          />
          <div className="text-center">
            <ButtonText
              text="Return to Log in"
              onClick={() => {
                navigate(ROUTES.DISTRIBUTOR.SIGNIN)
              }}
            />
          </div>
        </form>
      </section>
    </LandingLayout>
  )
}

export default ForgotPassword
