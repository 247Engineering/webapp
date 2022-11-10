import React, { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppLayout from '../../../components/layouts/AppLayout'
import Input from '../../../components/forms/Input'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import LocationInput from '../../../components/forms/LocationInput'

import { DistributorState, Address } from '../../../types'
import { AppDispatch, RootState } from '../../../store'
import {
  addWarehouse,
  resetWarehouseStamp,
} from '../../../store/features/distributor'
import * as ROUTES from '../../../routes'

const WarehouseForm = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { loading, warehouseStamp } = useSelector<RootState>(
    ({ distributor }) => distributor,
  ) as DistributorState

  const [warehouse, setWarehouse] = useState('')
  const [location, setLocation] = useState<Address | null>(null)
  const [locationDropdown, setLocationDropdown] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      addWarehouse({ name: warehouse, location: location as Address, email }),
    )
  }

  const canSubmit = useMemo(
    () => [warehouse, location, email].every((data) => !!data),
    [warehouse, location, email],
  )

  useEffect(() => {
    if (warehouseStamp) navigate(ROUTES.DISTRIBUTOR.WAREHOUSES)
    return () => {
      dispatch(resetWarehouseStamp())
    }
  })

  return (
    <div onClick={() => setLocationDropdown(false)} className="h-full">
      <AppLayout alternate onClose={() => navigate(-1)}>
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Add a warehouse location
          </h1>
          <p className="p text-black-100">
            Setup a new warehouse location for your business
          </p>
        </header>
        <section className="mt-8 h-full flex flex-col text-black">
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
              <LocationInput
                label="Warehouse location"
                setLocation={setLocation}
                dropdown={locationDropdown}
                setDropdown={setLocationDropdown}
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
              disabled={!canSubmit || loading}
              loading={loading}
              className="mt-24"
            />
          </form>
        </section>
      </AppLayout>
    </div>
  )
}

export default WarehouseForm
