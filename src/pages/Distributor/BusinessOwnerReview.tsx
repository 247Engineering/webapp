import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppLayout from '../../components/layouts/AppLayout'
import Status from '../../components/miscellaneous/Status'
import BusinessOwnerItem from '../../components/miscellaneous/BusinessOwnerItem'
import Checkbox from '../../components/forms/Checkbox'
import ButtonSubmit from '../../components/forms/ButtonSubmit'

import image from '../../assets/images/image.svg'
import edit from '../../assets/images/edit.svg'

import { AppDispatch, RootState } from '../../store'
import { DistributorState } from '../../types'
import { submitDistributor } from '../../store/features/distributor'
import * as ROUTES from '../../routes'

const BusinessOwnerReview = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const distributor = useSelector<RootState>(
    ({ distributor }) => distributor,
  ) as DistributorState
  const { stepsCompleted, loading, businessName } = distributor

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (stepsCompleted === 3) navigate(ROUTES.DISTRIBUTOR.DASHBOARD)
  }, [stepsCompleted, navigate])
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
        <section className="mt-8">
          <h5 className="mb-4 font-[700] leading-[1.5rem] text-[1rem] text-black">
            Company information
          </h5>
          <div className="company-info relative mb-8">
            <Status
              className="bg-green-light text-green rounded-[6px] px-[0.375rem] py-[0.125rem]"
              text="Completed"
            />
            <h6 className="mt-1 font-[700] leading-[1rem] text-[0.75rem] mt-1 text-black">
              Business name
            </h6>
            <p className="leading-[1.25rem] text-[0.875rem] mt-1 max-w-[13.563rem] text-black">
              {distributor.businessName}
            </p>
            <h6 className="mt-4 font-[700] leading-[1rem] text-[0.75rem] text-black">
              Address
            </h6>
            <p className="leading-[1.25rem] text-[0.875rem] mt-1 max-w-[13.563rem] text-black">
              {distributor.address}
            </p>
            <h6 className="font-[700] leading-[1rem] text-[0.75rem] mt-4 text-black">
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
          <h5 className="mb-4 font-[700] leading-[1.5rem] text-[1rem] text-black">
            Owner information
          </h5>
          {distributor.owners?.map((owner, i) => (
            <BusinessOwnerItem
              key={i}
              name={`${owner.firstName} ${owner.lastName}`}
              title={`Owner at ${businessName}`}
              id={owner.idImage as string}
            />
          ))}
          <button
            className="button button-inverted text-orange mb-[2.375rem]"
            onClick={() => navigate(ROUTES.DISTRIBUTOR.BUSINESS_OWNER_FORM)}
          >
            Add new owner
          </button>
          <Checkbox
            className="mb-[3.375rem]"
            id="business-owner-checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            label="I confirm that all information provided is truthful and correct"
          />
          <ButtonSubmit
            onClick={() => dispatch(submitDistributor())}
            text="Submit"
            disabled={loading || !checked}
            loading={loading}
          />
        </section>
      </AppLayout>
    </>
  )
}

export default BusinessOwnerReview
