import React, {
  useState,
  //  useEffect,
  useMemo,
} from 'react'
import {
  useDispatch,
  //  useSelector
} from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppLayout from '../../components/layouts/AppLayout'
import Input from '../../components/forms/Input'
import ButtonSubmit from '../../components/forms/ButtonSubmit'

import {
  AppDispatch,
  // RootState
} from '../../store'
// import { DistributorState } from '../../types'
import { completeStep } from '../../store/features/distributor'

const BusinessInfo = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  // const distributor = useSelector<RootState>(
  //   ({ distributor }) => distributor,
  // ) as DistributorState

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(completeStep(1))
    navigate('/account-setup')
  }

  const canSubmit = useMemo(
    () =>
      [firstName, lastName, businessName, email, address].every(
        (data) => !!data,
      ),
    [firstName, lastName, businessName, email, address],
  )

  // useEffect(() => {
  //   if ([business, address, city, country, state, cac].some((data) => !!data)) {
  //     dispatch(
  //       updateDistributor({
  //         businessName: business,
  //         address,
  //         city,
  //         country,
  //         state,
  //         cac: cac as string,
  //       }),
  //     )
  //     dispatch(completeStep(0.5))
  //   }
  // }, [business, address, city, country, state, cac, dispatch])

  return (
    <>
      <AppLayout
        alternate
        onClose={() => {
          navigate(-1)
        }}
      >
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Tell us about your business
          </h1>
          <p className="p text-black-100">
            Setting up your 24Seven account, it will only take 10 minutes
          </p>
        </header>
        <section className="mt-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="First name"
                  onChange={setFirstName}
                  value={firstName}
                  type="text"
                />
              </div>
              <div>
                <Input
                  label="Last name"
                  onChange={setLastName}
                  value={lastName}
                  type="text"
                />
              </div>
            </div>
            <div className="mb-4">
              <Input
                label="Email address"
                value={email}
                onChange={setEmail}
                type="text"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Business name"
                value={businessName}
                onChange={setBusinessName}
                type="text"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Address"
                value={address}
                onChange={setAddress}
                type="text"
              />
            </div>
            <ButtonSubmit
              text="Save and continue"
              onClick={handleSubmit}
              className="mt-12"
              disabled={!canSubmit}
            />
          </form>
        </section>
      </AppLayout>
    </>
  )
}

export default BusinessInfo
