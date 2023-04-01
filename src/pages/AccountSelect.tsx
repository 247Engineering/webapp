import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import OnboardingRadio from '../components/forms/OnboardingRadio'
import OnboardingLayout from '../components/layouts/OnboardingLayout'
import ButtonSubmit from '../components/forms/ButtonSubmit'

import distributorChecked from '../assets/images/distributor-checked.svg'
import distributor from '../assets/images/distributor.svg'
import retailerChecked from '../assets/images/retailer-checked.svg'
import retailer from '../assets/images/retailer.svg'
import deliveryChecked from '../assets/images/delivery-checked.svg'
import delivery from '../assets/images/delivery.svg'

import * as ROUTES from '../routes'

const AccountSelect = () => {
  const navigate = useNavigate()

  const [type, setType] = useState('distributor')

  const handleChange = (value: string) => {
    setType(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(ROUTES[type.toUpperCase() as keyof typeof ROUTES].SIGNIN)
  }

  return (
    <OnboardingLayout>
      <header className="bg-orange-light px-4 pb-[3.313rem]">
        <h1 className="h1 mb-2 max-w-[15.313rem] text-black">
          How do you want to use 24Seven
        </h1>
        <p className="p text-black-100">
          Welcome to 24Seven, create your account
        </p>
      </header>
      <section className="px-4 py-[2.375rem]">
        <form onSubmit={handleSubmit}>
          <OnboardingRadio
            id="distributor"
            name="account-select"
            value="distributor"
            img={distributor}
            imgChecked={distributorChecked}
            textPrimary="Distributor"
            textSecondary="Manage warehouses and operations"
            checked={type === 'distributor'}
            onChange={handleChange}
            className="mb-4"
          />
          <OnboardingRadio
            id="warehouse"
            name="account-select"
            value="warehouse"
            img={distributor}
            imgChecked={distributorChecked}
            textPrimary="Warehouse"
            textSecondary="Manage inventory and orders"
            checked={type === 'warehouse'}
            onChange={handleChange}
            className="mb-4"
          />
          <OnboardingRadio
            id="retailer"
            name="account-select"
            value="retailer"
            img={retailer}
            imgChecked={retailerChecked}
            textPrimary="Retailer"
            textSecondary="Shop for items directly from wholesalers"
            checked={type === 'retailer'}
            onChange={handleChange}
            className="mb-4"
          />
          <OnboardingRadio
            id="logistics"
            name="account-select"
            value="logistics"
            img={delivery}
            imgChecked={deliveryChecked}
            textPrimary="Delivery Rider"
            textSecondary="Deliver goods to appropriate destinations"
            checked={type === 'logistics'}
            onChange={handleChange}
            className="mb-6"
          />
          <ButtonSubmit text="Next" onClick={handleSubmit} className="mb-4" />
        </form>
      </section>
      <a href="/" className="text-center mt-auto privacy-policy">
        Terms of use. Privacy policy
      </a>
    </OnboardingLayout>
  )
}

export default AccountSelect
