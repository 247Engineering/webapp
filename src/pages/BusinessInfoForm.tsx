import React, { useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'
import Input from '../components/forms/Input'
import DragAndDrop from '../components/forms/DragAndDrop'
import ButtonSubmit from '../components/forms/ButtonSubmit'

const BusinessInfo = () => {
  const [business, setBusiness] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [file, setFile] = useState<string | ArrayBuffer | null>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const canSubmit = () =>
    [business, address, city, country, state, file].every((data) => !!data)

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
            <div className="mb-4">
              <Input
                label="Business name"
                value={business}
                onChange={setBusiness}
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
            <div className="mb-4">
              <Input label="City" value={city} onChange={setCity} type="text" />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Country"
                  options={['Nigeria']}
                  onChange={setCountry}
                  value={country}
                />
              </div>
              <div>
                <Input
                  label="State"
                  options={['FCT', 'Lagos']}
                  onChange={setState}
                  value={state}
                />
              </div>
            </div>
            <DragAndDrop
              label="Company verification document (CAC)"
              setData={setFile}
            />
            <ButtonSubmit
              text="Save and continue"
              onClick={handleSubmit}
              className="mt-12"
              disabled={!!canSubmit}
            />
          </form>
        </section>
      </AppLayout>
    </>
  )
}

export default BusinessInfo
