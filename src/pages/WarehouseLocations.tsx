import React, { useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'
import location from '../assets/images/location.svg'
import add from '../assets/images/add.svg'
import search from '../assets/images/search.svg'
import SortSelect from '../components/forms/SortSelect'
import WarehouseItem from '../components/miscellaneous/WarehouseItem'

const WarehouseLocations = () => {
  const [sort, setSort] = useState('')
  return (
    <>
      <AppLayout>
        <header className="flex justify-between">
          <div>
            <h1 className="h1 mb-2 text-black">Locations</h1>
            <p className="p text-black-100">
              <img
                src={location}
                className="w-[1.563rem] h-[1.25rem] inline"
                alt="location icon"
              />{' '}
              Femadons LTD.
            </p>
          </div>
          <button className="button-add bg-orange text-white w-[3rem] h-[3rem]">
            <img src={add} alt="add" className="w-[0.75rem] h-[0.75rem]" />
          </button>
        </header>
        <section className="mt-6 text-black">
          <div className="flex items-center mb-8">
            <SortSelect
              options={[
                'Value - highest to lowest',
                'Value - lowest to highest',
              ]}
              value={sort}
              onChange={(value) => setSort(value)}
            />
            <button
              className="d-flex justify-center items-center rounded-full bg-grey h-[2rem] w-[2rem] ml-2"
              onClick={() => {}}
            >
              <img
                src={search}
                alt="search"
                className="w-[1.25rem] h-[1.25rem] ml-[6px]"
              />
            </button>
          </div>
          <div className="mb-10">
            <h5 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
              Open (3)
            </h5>
            <WarehouseItem
              textPrimary="Femadons Victoria island"
              textSecondary="365 Adeola Odeku Street "
            />
            <WarehouseItem
              textPrimary="Femadons Lagos island"
              textSecondary="65 Adeola Odeku Street"
            />
            <WarehouseItem
              textPrimary="Femadons Apapa"
              textSecondary="11 Adeola Ademolu Adetiti Cole Street"
            />
          </div>
          <div>
            <h5 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
              Closed (1)
            </h5>
            <WarehouseItem
              textPrimary="Femadons Alaba"
              textSecondary="36 Obafemi Martins Street"
            />
          </div>
        </section>
      </AppLayout>
    </>
  )
}

export default WarehouseLocations
