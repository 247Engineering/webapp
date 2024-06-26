import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppLayout from '../../components/layouts/AppLayout'
import ButtonSubmit from '../../components/forms/ButtonSubmit'
import BusinessOwnerItem from '../../components/miscellaneous/BusinessOwnerItem'
import ButtonSubmitSmall from '../../components/forms/ButtonSubmitSmall'

import { RootState } from '../../store'
import { DistributorState } from '../../types'
import * as ROUTES from "../../routes"

const BusinessOwner = () => {
  const navigate = useNavigate()

  const distributor = useSelector<RootState>(
    ({ distributor }) => distributor,
  ) as DistributorState
  const { owners, businessName } = distributor

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
            Tell us about the business owner
          </h1>
          <p className="p text-black-100">
            Provide personal information of the business owners
          </p>
        </header>
        <section className="mt-8 h-full flex flex-col">
          {owners?.map((owner, i) => (
            <BusinessOwnerItem
              key={i}
              name={`${owner.firstName} ${owner.lastName}`}
              title={`Owner at ${businessName}`}
              id={owner.idImage as string}
            />
          ))}
          <ButtonSubmitSmall
            text="Add business owner"
            onClick={() => {
              navigate(ROUTES.DISTRIBUTOR.BUSINESS_OWNER_FORM)
            }}
            className="mt-4"
          />
          <ButtonSubmit
            text="Save and continue"
            onClick={() => {
              navigate(ROUTES.DISTRIBUTOR.ACCOUNT_SETUP)
            }}
            className="mt-[100%]"
          />
        </section>
      </AppLayout>
    </>
  )
}

export default BusinessOwner
