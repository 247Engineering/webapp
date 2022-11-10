import React from 'react'

import image from '../../../assets/images/image.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import TableLayout from '../../../components/tables/TableLayout'
import Status from '../../../components/miscellaneous/Status'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import Map from '../../../components/miscellaneous/Map'
import BackButton from '../../../components/forms/BackButton'

const OrderDetails = () => {
  return (
    <>
      <AppLayout>
        <header>
          <BackButton text="Orders" />
          <h1 className="font-[700] text-[1.25rem] leading-[1.75rem] my-2 text-black">
            Order #FD089345
          </h1>
          <p className="p mb-2 text-black-100">10/10/2022 at 13:00PM</p>
          <div className="flex">
            <Status
              className="bg-green-light text-green rounded-[10px] mr-2 py-1 px-2"
              text="Paid"
            />
            <Status
              className="bg-pumpkin-light text-pumpkin rounded-[10px] py-1 px-2"
              text="Pending order"
            />
          </div>
        </header>
        <section className="mt-6 text-black">
          <TableLayout>
            <thead>
              <tr>
                <th className="w-[14.688rem]">Item</th>
                <th className="w-[14.688rem]">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                  <div className="flex">
                    <img
                      src={image}
                      className="w-[2rem] h-[2rem] rounded-[2px] mr-2"
                      alt="product item"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="font-[700] capitalize">
                        Colgate optic white
                      </p>
                      <p>75ml</p>
                    </div>
                  </div>
                </td>
                <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                  N1,000 x 50
                </td>
              </tr>
              <tr>
                <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                  <div className="flex">
                    <img
                      src={image}
                      className="w-[2rem] h-[2rem] rounded-[2px] mr-2"
                      alt="product item"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="font-[700] capitalize">
                        Indomie onion chicken
                      </p>
                      <p>75ml</p>
                    </div>
                  </div>
                </td>
                <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                  N1,000 x 50
                </td>
              </tr>
              <tr>
                <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                  <div className="flex">
                    <img
                      src={image}
                      className="w-[2rem] h-[2rem] rounded-[2px] mr-2"
                      alt="product item"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="font-[700] capitalize">Indomie relish</p>
                      <p>Carton(40 pcs)</p>
                    </div>
                  </div>
                </td>
                <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                  N4,000 x 24
                </td>
              </tr>
            </tbody>
          </TableLayout>
          <div className="mt-[1.875rem] rounded-tr-[12px] rounded-tl-[12px] border border-solid border-grey-light w-full h-[8.375rem]">
            <Map
              center={{ lat: 9.0765, lng: 7.3986 }}
              lat={9.0765}
              lng={7.3986}
            />
          </div>
          <div className="rounded-br-[12px] rounded-bl-[12px] border border-solid border-grey-light p-4 mb-[2.375rem]">
            <h5 className="mb-4 font-[700] text-[1rem] leading-[1.5rem]">
              Customer Information
            </h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-[0.75rem] leading-[1rem]">
                <h6 className="font-[700] mb-2">Shipping address</h6>
                <p className="max-w-[8.75rem]">
                  Ebeano Supermarket Chevron 556 Chevron Drive, Lekki, Lagos
                  101210 Nigeria
                </p>
              </div>
              <div className="text-[0.75rem] leading-[1rem]">
                <h6 className="font-[700] mb-2">Payment method</h6>
                <p className="max-w-[8.75rem]">Bank transfer</p>
              </div>
            </div>
          </div>
          <ButtonSubmit text="Confirm order" onClick={() => {}} />
        </section>
      </AppLayout>
    </>
  )
}

export default OrderDetails
