import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import search from '../../../assets/images/search.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import SortSelect from '../../../components/forms/SortSelect'
import TableLayout from '../../../components/tables/TableLayout'

import { RootState, AppDispatch } from '../../../store'
import * as ROUTES from '../../../routes'
import { RetailerState } from '../../../types'
import { fetchOrders } from '../../../store/features/retailer'

const RetailerOrders = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { orders } = useSelector<RootState>(
    ({ retailer }) => retailer,
  ) as RetailerState

  const ongoingOrders = useMemo(
    () => orders.filter((order) => order.status !== 'COMPLETED'),
    [orders],
  )
  const completedOrders = useMemo(
    () => orders.filter((order) => order.status === 'COMPLETED'),
    [orders],
  )

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const [sort, setSort] = useState('')
  return (
    <>
      <AppLayout cart hideName>
        <header>
          <h1 className="h1 text-black">Orders</h1>
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
          <h4 className="mb-2 font-[700] text-[1rem] leading-[1.5rem]">
            Ongoing ({ongoingOrders.length})
          </h4>
          <TableLayout>
            <thead>
              <tr>
                <th className="w-[9.5rem]">Order ID</th>
                <th className="w-[9.5rem]">Date</th>
                <th className="w-[9.5rem]">Customer Address</th>
              </tr>
            </thead>
            <tbody>
              {ongoingOrders.map((order) => (
                <tr key={order.id}>
                  <td
                    className="w-[9.5rem] overflow-hidden text-ellipsis p-4 font-[700] text-[0.75rem] leading-[1rem] text-purple uppercase"
                    onClick={() =>
                      navigate(ROUTES.RETAILER.ORDER_STATUS_FOR(order.id))
                    }
                  >
                    {order.id}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {format(
                      order.order_date
                        ? new Date(order.order_date)
                        : new Date(),
                      'dd/M/yyy h:ma',
                    )}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {order.address || 'Ebeano Supermarket Chevron'}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableLayout>
          <h4 className="mt-8 mb-2 font-[700] text-[1rem] leading-[1.5rem]">
            Completed ({completedOrders.length})
          </h4>
          <TableLayout className="mb-8">
            <thead>
              <tr>
                <th className="w-[9.5rem]">Order ID</th>
                <th className="w-[9.5rem]">Date</th>
                <th className="w-[9.5rem]">Customer Address</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.map((order) => (
                <tr key={order.id}>
                  <td
                    className="w-[9.5rem] p-4 font-[700] text-[0.75rem] leading-[1rem] text-purple uppercase"
                    onClick={() =>
                      navigate(ROUTES.RETAILER.ORDER_STATUS_FOR(order.id))
                    }
                  >
                    {order.id}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {format(
                      order.order_date
                        ? new Date(order.order_date)
                        : new Date(),
                      'dd/M/yyy h:ma',
                    )}
                  </td>
                  <td className="w-[9.5rem] p-4 text-[0.75rem] leading-[1rem]">
                    {order.address || 'Ebeano Supermarket Chevron'}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableLayout>
        </section>
      </AppLayout>
    </>
  )
}

export default RetailerOrders
