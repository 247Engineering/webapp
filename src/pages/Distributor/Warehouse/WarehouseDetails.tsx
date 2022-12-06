import React, { useState } from 'react'

import edit from '../../../assets/images/edit.svg'
import image from '../../../assets/images/image.svg'
import dots from '../../../assets/images/three-dots-white.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import TableLayout from '../../../components/tables/TableLayout'
import TableFooter from '../../../components/tables/TableFooter'
import BackButton from '../../../components/forms/BackButton'

const WarehouseDetails = () => {
  const [type, setType] = useState('details')

  return (
    <>
      <AppLayout>
        <header>
          <BackButton text="Warehouse" />
          <div className="flex justify-between mt-2 mb-7">
            <div>
              <h1 className="font-[700] text-[1.25rem] leading-[1.75rem] mb-2 text-black">
                Femadons Victoria Island
              </h1>
              <p className="p mb-2 text-black-100">10/10/2022 at 13:00PM</p>
            </div>
            <button className="bg-orange h-[2rem] w-[2rem] rounded-[10px] flex justify-center items-center">
              <img src={dots} alt="open options" />
            </button>
          </div>
        </header>
        <section>
          <div className="p-1 bg-grey-light-200 rounded-[10px] flex items-center justify-between font-[700] text-[0.875rem] leading-[1.25rem] mb-8">
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] p-[0.625rem] w-[9.75rem] ${
                type === 'details' ? 'text-orange bg-orange-light-100' : ''
              }`}
              onClick={() => setType('details')}
            >
              Warehouse details
            </button>
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] p-[0.625rem] w-[9.75rem] ${
                type === 'inventory' ? 'text-orange bg-orange-light-100' : ''
              }`}
              onClick={() => setType('inventory')}
            >
              Inventory
            </button>
          </div>
          {type === 'details' ? (
            <>
              <div className="rounded-[12px] border border-solid border-grey-light p-4 relative mb-4">
                <h6 className="mb-2 font-[700] text-[0.75rem] leading-[1rem]">
                  Warehouse Manager
                </h6>
                <div className="font-[400] text-[0.875rem] leading-[1.25rem]">
                  <p>Funpe Martins</p>
                  <p>fmartins@femadons.com</p>
                </div>
                <img
                  className="absolute w-[1.25rem] h-[1.25rem] top-[1.25rem] right-[1.25rem]"
                  src={edit}
                  alt="edit"
                  onClick={() => {}}
                />
              </div>
              <div className="rounded-[12px] border border-solid border-grey-light p-4 relative mb-4">
                <div className="mb-4">
                  <h6 className="mb-2 font-[700] text-[0.75rem] leading-[1rem]">
                    Warehouse Name
                  </h6>
                  <p className="font-[400] text-[0.875rem] leading-[1.25rem]">
                    Director at Femadons
                  </p>
                </div>
                <div>
                  <h6 className="mb-2 font-[700] text-[0.75rem] leading-[1rem]">
                    Warehouse Address
                  </h6>
                  <p className="font-[400] text-[0.875rem] leading-[1.25rem] max-w-[13.563rem]">
                    635 Akin Adesola, Victoria island Lagos, Nigeria
                  </p>
                </div>
                <img
                  className="absolute w-[1.25rem] h-[1.25rem] top-[1.25rem] right-[1.25rem]"
                  src={edit}
                  alt="edit"
                  onClick={() => {}}
                />
              </div>
            </>
          ) : (
            <>
              <TableLayout>
                <thead>
                  <tr>
                    <th className="w-[11.938rem]">Products</th>
                    <th className="w-[11.188rem]">SKU</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(3)
                    .fill('')
                    .map((_, i) => (
                      <tr key={i} className="text-[0.75rem] leading-[1rem]">
                        <td className="w-[11.938rem] px-4 py-2">
                          <div className="flex items-center">
                            <img
                              src={image}
                              className="w-[2rem] h-[2rem] rounded-[4px] mr-2"
                              alt="product item"
                            />
                            <p className="font-[700] text-purple capitalize truncate">
                              Honeywell Macaroni and pasta and things
                            </p>
                          </div>
                        </td>
                        <td className="w-[11.188rem] p-4">789345</td>
                      </tr>
                    ))}
                </tbody>
              </TableLayout>
              <TableFooter />
            </>
          )}
        </section>
      </AppLayout>
    </>
  )
}

export default WarehouseDetails
