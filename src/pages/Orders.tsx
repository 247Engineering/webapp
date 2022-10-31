import React, { useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'
import location from '../assets/images/location.svg'
import search from '../assets/images/search.svg'
import SortSelect from '../components/forms/SortSelect'
import TableLayout from '../components/layouts/TableLayout'

const Orders = () => {
  const [sort, setSort] = useState('')
  return (
    <>
      <AppLayout>
        <header>
          <div>
            <h1 className="h1 mb-2 text-black">Orders</h1>
            <p className="p text-black-100">
              <img
                src={location}
                className="w-[1.563rem] h-[1.25rem] inline"
                alt="location icon"
              />{' '}
              Femadons Warehouse Victoria Island.
            </p>
          </div>
        </header>
        <section className="mt-6 text-black">
          <div className="flex items-center mb-[1.875rem]">
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
          <TableLayout>
            <thead>
              <tr>
                <th className='w-[9.5rem]'>Order ID</th>
                <th className='w-[9.5rem]'>Date</th>
                <th className='w-[9.5rem]'>Customer Address</th>
                <th className='w-[9.5rem]'>Customer Address</th>
                <th className='w-[9.5rem]'>Customer Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[9.5rem] p-4 font-[700] text-[0.75rem] leading-[1rem] text-purple">
                  FD089345
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  10/10/2022 13:00PM
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Ebeano Supermarket Chevron
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Ebeano Supermarket Chevron
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Ebeano Supermarket Chevron
                </td>
              </tr>
              <tr>
                <td className="w-[9.5rem] p-4 font-[700] text-[0.75rem] leading-[1rem] text-purple">
                  FD089345
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  10/10/2022 13:00PM
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Spar Lekki
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Spar Lekki
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Spar Lekki
                </td>
              </tr>
              <tr>
                <td className="w-[9.5rem] p-4 font-[700] text-[0.75rem] leading-[1rem] text-purple">
                  FD089345
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  10/10/2022 13:00PM
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Ebeano Supermarket Chevron
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Ebeano Supermarket Chevron
                </td>
                <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                  Ebeano Supermarket Chevron
                </td>
              </tr>
            </tbody>
          </TableLayout>
          <p className="mt-2 py-5 px-4 text-[0.75rem] leading-[1rem] text-black-100">
            Showing 1-10 of 30 items
          </p>
        </section>
      </AppLayout>
    </>
  )
}

export default Orders
