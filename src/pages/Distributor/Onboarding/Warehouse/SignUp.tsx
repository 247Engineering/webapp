import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import ButtonSubmit from '../../../../components/forms/ButtonSubmit'
import ButtonText from '../../../../components/forms/ButtonText'
import Checkbox from '../../../../components/forms/Checkbox'
import Input from '../../../../components/forms/Input'
import LandingLayout from '../../../../components/layouts/LandingLayout'

import {
  createWarehouseUser,
  passwordStampReset,
} from '../../../../store/features/auth'
import { AppDispatch, RootState } from '../../../../store'
import { AuthState } from '../../../../types'
import * as ROUTES from '../../../../routes'

const SignUp = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const dispatch = useDispatch<AppDispatch>()
  const { loading, resetPasswordStamp } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      createWarehouseUser({
        token: searchParams.get('token') as string,
        password,
        fname,
        lname,
      }),
    )
  }

  useEffect(() => {
    if (resetPasswordStamp) {
      toast.success('your account has been created. login to continue')
      navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_LOGIN)
    }

    return () => {
      dispatch(passwordStampReset())
    }
  }, [resetPasswordStamp, dispatch, navigate])

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
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Input
                label="First name"
                value={fname}
                onChange={setFname}
                type="text"
              />
            </div>
            <div>
              <Input
                label="Last name"
                value={lname}
                onChange={setLname}
                type="text"
              />
            </div>
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
                navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_LOGIN)
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
