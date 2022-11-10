import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import ButtonSubmit from '../components/forms/ButtonSubmit'
import Input from '../components/forms/Input'
import LandingLayout from '../components/layouts/LandingLayout'

import { resetPassword, passwordStampReset } from '../store/features/auth'
import { RootState, AppDispatch } from '../store'
import { AuthState } from '../types'
import * as ROUTES from '../routes'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { loading, resetPasswordStamp } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      resetPassword({ password, token: searchParams.get('token') as string }),
    )
  }

  useEffect(() => {
    if (resetPasswordStamp) {
      toast.success('password has been reset')
      navigate(ROUTES.AUTH.ACCOUNT_SELECT)
    }
    return () => {
      dispatch(passwordStampReset())
    }
  }, [resetPasswordStamp, navigate, dispatch])

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Reset Password?</h1>
        <p className="p text-black-100">
          Create a new password and confirm it.
        </p>
      </header>
      <section className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="New password"
              value={password}
              onChange={setPassword}
              type="password"
            />
          </div>
          <div className="mb-[3.75rem]">
            <Input
              label="Confirm password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              type="password"
              error={password !== confirmPassword}
              errorText="Password does not match"
            />
          </div>
          <ButtonSubmit
            text="Change password"
            onClick={handleSubmit}
            disabled={!password || password !== confirmPassword || loading}
            loading={loading}
          />
        </form>
      </section>
    </LandingLayout>
  )
}

export default ResetPassword
