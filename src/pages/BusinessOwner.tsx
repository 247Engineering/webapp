import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppLayout from '../components/layouts/AppLayout'
import ButtonSubmit from '../components/forms/ButtonSubmit'
import BusinessOwnerItem from '../components/miscellaneous/BusinessOwnerItem'
import ButtonSubmitSmall from '../components/forms/ButtonSubmitSmall'

import { RootState } from '../store'
import { Owner } from '../types'

const BusinessOwner = () => {
  const navigate = useNavigate()

  const owners = useSelector<RootState>(
    ({ distributor }) => distributor.owners,
  ) as Owner[]
  return (
    <>
      <AppLayout alternate>
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2">
            Tell us about the business owner
          </h1>
          <p className="p">
            Provide personal information of the business owners
          </p>
        </header>
        <section className="mt-8 h-full flex flex-col">
          {owners.map((owner, i) => (
            <BusinessOwnerItem
              key={i}
              name={`${owner.firstName} ${owner.lastName}`}
              title="Director at Femadons"
              id={owner.idImage as string}
            />
          ))}
          <ButtonSubmitSmall
            text="Add business owner"
            onClick={() => {
              navigate('/business-owner/form')
            }}
            className="mt-4"
          />
          <ButtonSubmit
            text="Save and continue"
            onClick={() => {
              navigate('/account-setup')
            }}
            className="mt-[100%]"
          />
        </section>
      </AppLayout>
    </>
  )
}

export default BusinessOwner
