import React from 'react'
import AppLayout from '../components/layouts/AppLayout'
import ButtonSubmit from '../components/forms/ButtonSubmit'
import BusinessOwnerItem from '../components/miscellaneous/BusinessOwnerItem'
import ButtonSubmitSmall from '../components/forms/ButtonSubmitSmall'

const BusinessOwner = () => {
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
          <BusinessOwnerItem
            name="David Asiegbunam"
            title="Director at Femadons"
          />
          <BusinessOwnerItem
            name="David Asiegbunam"
            title="Director at Femadons"
          />
          <ButtonSubmitSmall
            text="Add business owner"
            onClick={() => {}}
            className="mt-4"
          />
          <ButtonSubmit
            text="Save and continue"
            onClick={() => {}}
            className="mt-[100%]"
          />
        </section>
      </AppLayout>
    </>
  )
}

export default BusinessOwner
