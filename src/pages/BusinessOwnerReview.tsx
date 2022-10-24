import React, { useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'
import Status from '../components/miscellaneous/Status'
import BusinessOwnerItem from '../components/miscellaneous/BusinessOwnerItem'
import Checkbox from '../components/forms/Checkbox'
import image from '../assets/images/image.svg'
import edit from '../assets/images/edit.svg'
import ButtonSubmit from '../components/forms/ButtonSubmit';

const BusinessOwnerReview = () => {
  const [checked, setChecked] = useState(false)
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
        <section className="mt-8">
          <h5 className="mb-4 font-[700] leading-[1.5rem] text-[1rem]">
            Company information
          </h5>
          <div className="company-info relative mb-8">
            <Status className="bg-green-light text-green rounded-[6px] px-[0.375rem] py-[0.125rem]" text="Completed" />
            <h6 className="mt-1 font-[700] leading-[1rem] text-[0.75rem] mt-1">
              Business name
            </h6>
            <p className="leading-[1.25rem] text-[0.875rem] mt-1 max-w-[13.563rem]">
              Director at Femadons
            </p>
            <h6 className="mt-4 font-[700] leading-[1rem] text-[0.75rem]">
              Address
            </h6>
            <p className="leading-[1.25rem] text-[0.875rem] mt-1 max-w-[13.563rem]">
              635 Akin Adesola, Victoria island Lagos, Nigeria
            </p>
            <h6 className="font-[700] leading-[1rem] text-[0.75rem] mt-4">
              Company verification document (CAC)
            </h6>
            <img
              className="mt-1 w-[4.688rem] h-[4.688rem]"
              src={image}
              alt="cac document"
            />
            <img
              className="absolute w-[1.25rem] h-[1.25rem] top-[1.25rem] right-[1.25rem]"
              src={edit}
              alt="edit"
              onClick={() => {}}
            />
          </div>
          <h5 className="mb-4 font-[700] leading-[1.5rem] text-[1rem]">
            Owner information
          </h5>
          <BusinessOwnerItem
            name="David Asiegbunam"
            title="Director at Femadons"
          />
          <BusinessOwnerItem name="Mike Jones" title="Director at Femadons" />
          <button className="button button-inverted text-orange mb-[2.375rem]">
            Add new owner
          </button>
          <Checkbox
            className="mb-[3.375rem]"
            id="business-owner-checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            label="I confirm that all information provided is truthful and correct"
          />
          <ButtonSubmit onClick={() => {}} text="Submit" />
        </section>
      </AppLayout>
    </>
  )
}

export default BusinessOwnerReview
