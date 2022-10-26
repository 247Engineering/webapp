import React, { useState } from 'react'
import ButtonSubmit from '../../components/forms/ButtonSubmit'
import ButtonText from '../../components/forms/ButtonText'
import Input from '../../components/forms/Input'
import LandingLayout from '../../components/layouts/LandingLayout'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2">Sign In</h1>
        <p className="p">Welcome back</p>
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
            onClick={() => {}}
            className="mb-12"
          />
          <ButtonSubmit
            text="Sign in"
            onClick={handleSubmit}
            className="mb-4"
          />
          <p className="p text-center">
            Don't have an account?{' '}
            <ButtonText
              text="Sign up"
              onClick={() => {}}
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
