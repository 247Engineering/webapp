import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'

import image from '../../../../assets/images/image.svg'

import AppLayout from '../../../../components/layouts/AppLayout'
import TableLayout from '../../../../components/tables/TableLayout'
import Status from '../../../../components/miscellaneous/Status'
import ButtonSubmit from '../../../../components/forms/ButtonSubmit'
import Map from '../../../../components/miscellaneous/Map'
import BackButton from '../../../../components/forms/BackButton'

import {
  fetchWarehouseOrder,
  updateWarehouseOrder,
} from '../../../../store/features/distributor'
import { AppDispatch, RootState } from '../../../../store'
import { DistributorState } from '../../../../types'
// import * as ROUTES from '../../../../routes'

const OrderDetails = () => {
  const { warehouse, order: orderId } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const { order } = useSelector<RootState>(
    ({ distributor }) => distributor,
  ) as DistributorState

  useEffect(() => {
    dispatch(
      fetchWarehouseOrder({
        warehouse: warehouse as string,
        order: orderId as string,
      }),
    )
  }, [dispatch, warehouse, orderId])

  return (
    <>
      <AppLayout>
        <header>
          <BackButton text="Orders" />
          <h1 className="font-[700] text-[1.25rem] leading-[1.75rem] my-2 text-black">
            Order #{order?.order_id.replace('ORD_', '')}
          </h1>
          <p className="p mb-2 text-black-100">
            {format(
              order.order_date ? new Date(order.order_date) : new Date(),
              'dd/M/yyy',
            )}{' '}
            at{' '}
            {format(
              order.order_date ? new Date(order.order_date) : new Date(),
              'h:Ma',
            )}
          </p>
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
              {order?.line_items.map((item: any) => (
                <tr>
                  <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                    <div className="flex">
                      <img
                        src={item.images[0] || image}
                        className="w-[2rem] h-[2rem] rounded-[2px] mr-2"
                        alt="product item"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="font-[700] capitalize">{item.name}</p>
                        <p>75ml</p>
                      </div>
                    </div>
                  </td>
                  <td className="w-[14.688rem] p-4 text-[0.75rem] leading-[1rem]">
                    N{Number(item.price).toLocaleString()} x {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableLayout>
          <div className="mt-[1.875rem] rounded-tr-[12px] rounded-tl-[12px] border border-solid border-grey-light w-full h-[8.375rem] overflow-hidden">
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
          <ButtonSubmit
            text="Confirm order"
            onClick={() =>
              dispatch(
                updateWarehouseOrder({
                  order: orderId as string,
                  warehouse: warehouse as string,
                  status: 'CONFIRMED',
                }),
              )
            }
          />
        </section>
      </AppLayout>
    </>
  )
}

export default OrderDetails
