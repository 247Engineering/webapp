import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonSubmit from '../../components/forms/ButtonSubmit'
import ButtonText from '../../components/forms/ButtonText'
import Input from '../../components/forms/Input'
import LandingLayout from '../../components/layouts/LandingLayout'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2">Forgot Password?</h1>
        <p className="p">
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
