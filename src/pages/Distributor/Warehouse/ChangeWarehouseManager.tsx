import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AppLayout from '../../../components/layouts/AppLayout'
import Input from '../../../components/forms/Input'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'

import { DistributorState } from '../../../types'
import { AppDispatch, RootState } from '../../../store'
import {
  resetWarehouseStamp,
} from '../../../store/features/distributor'
import * as ROUTES from '../../../routes'

const WarehouseForm = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { loading, warehouseStamp } = useSelector<RootState>(
    ({ distributor }) => distributor,
  ) as DistributorState
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // dispatch(
    //   addWarehouse({ name: warehouse, location: location as Address, email }),
    // )
  }

  useEffect(() => {
    if (warehouseStamp) navigate(ROUTES.DISTRIBUTOR.WAREHOUSES)
    return () => {
      dispatch(resetWarehouseStamp())
    }
  })

  return (
    <div className="h-full">
      <AppLayout alternate onClose={() => navigate(-1)}>
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Change warehouse manager
          </h1>
          <p className="p text-black-100">
            By taking this action you will revoke{' '}
            <span className="font-[700]">Funpe Martins</span> role as warehouse
            manager for <span className="font-[700]">Femadons VI</span>
          </p>
        </header>
        <section className="mt-8 h-full flex flex-col text-black">
          <form onSubmit={handleSubmit}>
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
              disabled={!email || loading}
              loading={loading}
              className="mt-[100%]"
            />
          </form>
        </section>
      </AppLayout>
    </div>
  )
}

export default WarehouseForm
