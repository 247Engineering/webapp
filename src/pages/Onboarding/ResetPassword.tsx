import React, { useState } from 'react'

import ButtonSubmit from '../../components/forms/ButtonSubmit'
import Input from '../../components/forms/Input'
import LandingLayout from '../../components/layouts/LandingLayout'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LandingLayout>
      <header>
        <h1 className="h1 mb-2">Reset Password?</h1>
        <p className="p">Create a new password and confirm it.</p>
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
            disabled={!password || password !== confirmPassword}
          />
        </form>
      </section>
    </LandingLayout>
  )
}

export default ResetPassword
