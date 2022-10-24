import React, { useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'
import Input from '../components/forms/Input'
import DragAndDrop from '../components/forms/DragAndDrop'
import PhoneNumberInput from '../components/forms/PhoneNumberInput';

const BusinessInfo = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [callingCode, setCallingCode] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<string | ArrayBuffer | null>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const canSubmit = () =>
    [firstName, lastName, callingCode, mobile, email, file].every(
      (data) => !!data,
    )

  return (
    <>
      <AppLayout alternate>
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2">
            Tell us about your business
          </h1>
          <p className="p">
            Setting up your 24Seven account, it will only take 10 minutes
          </p>
        </header>
        <section className="mt-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="First name"
                  value={firstName}
                  onChange={setFirstName}
                  type="text"
                />
              </div>
              <div>
                <Input
                  label="Last name"
                  value={lastName}
                  onChange={setLastName}
                  type="text"
                />
              </div>
            </div>
            <div className="mb-4">
              <PhoneNumberInput setCode={setCallingCode} setMobile={setMobile} />
            </div>
            <div className="mb-4">
              <Input
                label="Email address"
                value={email}
                onChange={setEmail}
                type="text"
              />
            </div>
            <DragAndDrop
              label="ID (International passport, Driver’s license, NIN)"
              setData={setFile}
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                disabled={!!canSubmit}
                className="button button-small button-primary"
                onClick={() => {}}
              >
                Save
              </button>
              <button
                className="button button-small button-primary button-secondary text-orange"
                onClick={() => {}}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </AppLayout>
    </>
  )
}

export default BusinessInfo
