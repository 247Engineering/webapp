import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import AppLayout from '../components/layouts/AppLayout'
import Input from '../components/forms/Input'
import DragAndDrop from '../components/forms/DragAndDrop'
import PhoneNumberInput from '../components/forms/PhoneNumberInput'

import { AppDispatch } from '../store'
import { addOwner, completeStep } from '../store/features/distributor'

const BusinessInfo = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [callingCode, setCallingCode] = useState('+234')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<string | ArrayBuffer | null>('')

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    dispatch(
      addOwner({
        firstName,
        lastName,
        phoneNumber: callingCode + mobile,
        email,
        idImage: file as string,
      }),
    )
    dispatch(completeStep(2))
    navigate('/business-owner')
  }

  const canSubmit = useMemo(
    () =>
      [firstName, lastName, callingCode, mobile, email, file].every(
        (data) => !!data,
      ),
    [firstName, lastName, callingCode, mobile, email, file],
  )

  useEffect(() => {
    if (
      [firstName, lastName, callingCode, mobile, email, file].some(
        (data) => !!data,
      )
    )
      dispatch(completeStep(0.5))
  }, [firstName, lastName, callingCode, mobile, email, file, dispatch])

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
              <PhoneNumberInput
                code={callingCode}
                setCode={setCallingCode}
                setMobile={setMobile}
                mobile={mobile}
              />
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
                disabled={!canSubmit}
                className="bg-orange text-white button button-small button-primary"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="button button-small button-primary button-secondary text-orange"
                onClick={() => {
                  navigate('/business-owner')
                }}
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
