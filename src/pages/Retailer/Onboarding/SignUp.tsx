import React, { useState, useEffect } from 'react'
import {
  // useDispatch,
  useSelector,
} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import ButtonText from '../../../components/forms/ButtonText'
import Checkbox from '../../../components/forms/Checkbox'
import Input from '../../../components/forms/Input'
import LandingLayout from '../../../components/layouts/LandingLayout'
import PhoneNumberInput from '../../../components/forms/PhoneNumberInput'

import { useAuth } from '../../../hooks/useAuth'
// import { signup } from '../../../store/features/auth'
import {
  //  AppDispatch,
  RootState,
} from '../../../store'
import { AuthContextType, AuthState } from '../../../types'

const SignUp = () => {
  const navigate = useNavigate()

  // const dispatch = useDispatch<AppDispatch>()
  const { loading, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState
  const { login } = useAuth() as AuthContextType

  const [callingCode, setCallingCode] = useState('+234')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // dispatch(signup({ email, password, fname, lname }))
  }

  useEffect(() => {
    if (id) login({ id, type: "retailer" })
  }, [id, login])

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2 text-black">Create your account</h1>
        <p className="p text-black-100">
          Welcome to 24Seven, create your account
        </p>
      </header>
      <section className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <PhoneNumberInput
              code={callingCode}
              setCode={setCallingCode}
              setMobile={setMobile}
              mobile={mobile}
            />
          </div>
          <div className="mb-[1.875rem]">
            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
            />
          </div>
          <Checkbox
            className="mb-[3.375rem]"
            id="terms-checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            label={
              <>
                By clicking Sign Up, you are affirming that you have read and
                accepted the{' '}
                <a className="text-purple" href="/">
                  Terms & Conditions
                </a>
              </>
            }
          />
          <ButtonSubmit
            text="Sign up"
            onClick={handleSubmit}
            className="mb-4"
            disabled={loading || !checked}
            loading={loading}
          />
          <p className="p text-center">
            Already on 24Seven?{' '}
            <ButtonText
              text="Log in here"
              onClick={() => {
                navigate('/signin')
              }}
              className="font-[400]"
            />
          </p>
        </form>
      </section>
    </LandingLayout>
  )
}

export default SignUp
