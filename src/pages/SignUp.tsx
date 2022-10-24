import React, { useState } from 'react'
import ButtonSubmit from '../components/forms/ButtonSubmit'
import ButtonText from '../components/forms/ButtonText'
import Checkbox from '../components/forms/Checkbox'
import Input from '../components/forms/Input'
import LandingLayout from '../components/layouts/LandingLayout'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2">Create your account</h1>
        <p className="p">Welcome to 24Seven, create your account</p>
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
          />
          <p className="p text-center">
            Already on 24Seven?{' '}
            <ButtonText
              text="Log in here"
              onClick={() => {}}
              className="font-[400]"
            />
          </p>
        </form>
      </section>
    </LandingLayout>
  )
}

export default SignUp
