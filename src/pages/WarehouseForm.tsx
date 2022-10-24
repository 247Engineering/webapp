import React, { useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'
import Input from '../components/forms/Input'
import ButtonSubmit from '../components/forms/ButtonSubmit'
import locationIcon from '../assets/images/location.svg'

const WarehouseForm = () => {
  const [warehouse, setWarehouse] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const canSubmit = () => [warehouse, location, email].every((data) => !!data)

  return (
    <>
      <AppLayout alternate>
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2">
            Add a warehouse location
          </h1>
          <p className="p">Setup a new warehouse location for your business</p>
        </header>
        <section className="mt-8 h-full flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Warehouse name"
                value={warehouse}
                onChange={setWarehouse}
                type="text"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Warehouse location"
                value={location}
                onChange={setLocation}
                type="text"
                image={locationIcon}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Warehouse manager email"
                value={email}
                onChange={setEmail}
                type="text"
              />
            </div>
            <ButtonSubmit
              text="Submit"
              onClick={handleSubmit}
              disabled={!!canSubmit}
              className="mt-[100%]"
            />
          </form>
        </section>
      </AppLayout>
    </>
  )
}

export default WarehouseForm
