import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ButtonSubmit from '../../../../components/forms/ButtonSubmit'
import ButtonText from '../../../../components/forms/ButtonText'
import Input from '../../../../components/forms/Input'
import LandingLayout from '../../../../components/layouts/LandingLayout'

import { useAuth } from '../../../../hooks/useAuth'
import { signin } from '../../../../store/features/auth'
import { AppDispatch, RootState } from '../../../../store'
import { AuthContextType, AuthState } from '../../../../types'
import * as ROUTES from '../../../../routes'

const SignIn = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { loading, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState
  const { login } = useAuth() as AuthContextType

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signin({ email, password, type: 'warehouse' }))
  }

  useEffect(() => {
    if (id) login({ id, type: 'warehouse' })
  }, [id, login])

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Sign In</h1>
        <p className="p text-black-100">Welcome back</p>
      </header>
      <section className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Email address"
              value={email}
              onChange={setEmail}
              type="email"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
            />
          </div>
          <ButtonText
            text="Forgot Password?"
            onClick={() => {
              navigate(ROUTES.DISTRIBUTOR.FORGOT_PASSWORD)
            }}
            className="mb-12"
          />
          <ButtonSubmit
            text="Sign in"
            onClick={handleSubmit}
            className="mb-4"
            disabled={loading}
            loading={loading}
          />
          <p className="p text-center">
            Don't have an account?{' '}
            <ButtonText
              text="Sign up"
              onClick={() => {
                navigate(ROUTES.AUTH.ACCOUNT_SELECT)
              }}
              className="font-[400]"
            />
          </p>
        </form>
      </section>
      <a href="/" className="text-center mt-auto privacy-policy">
        Terms of use. Privacy policy
      </a>
    </LandingLayout>
  )
}

export default SignIn
