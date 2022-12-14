import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import add from '../../../assets/images/add-payment.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import PaymentOptionItem from '../../../components/miscellaneous/PaymentOption'

import { RetailerState } from '../../../types'
import { AppDispatch, RootState } from '../../../store'
import {
  clearRetailerStamp,
  completeOrder,
} from '../../../store/features/retailer'
import * as ROUTES from '../../../routes'

const paymentOptionMap = {
  cash: 0,
  card: 1,
  transfer: 2,
}

const RetailerPayment = () => {
  const navigate = useNavigate()
  const { order } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const { cartItems, loading, retailerStamp } = useSelector<RootState>(
    ({ retailer }) => retailer,
  ) as RetailerState

  const [paymentOption, setPaymentOption] = useState('cash')
  const [selectedCard, setSelectedCard] = useState('mastercard')

  const handleSubmit = () => {
    dispatch(
      completeOrder({
        order_doc_id: order as string,
        payment_option:
          paymentOptionMap[paymentOption as 'cash' | 'card' | 'transfer'],
      }),
    )
  }

  useEffect(() => {
    if (retailerStamp)
      navigate(ROUTES.RETAILER.ORDER_NOTIFICATION_FOR(order as string))
    return () => {
      dispatch(clearRetailerStamp())
    }
  }, [order, retailerStamp, dispatch, navigate])

  return (
    <div>
      <AppLayout
        cart
        hideLogo
        hideName
        secondaryNav="Make Payment"
        secondaryNavBack="Checkout"
        back={ROUTES.RETAILER.CHECKOUT}
      >
        <section>
          <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
            Saved cards
          </h4>
          <PaymentOptionItem
            id="mastercard"
            name="card"
            value="mastercard"
            text="...6234"
            checked={paymentOption === 'card' && selectedCard === 'mastercard'}
            onChange={(value) => setSelectedCard(value)}
            option="mastercard"
            className="mb-2"
          />
          <PaymentOptionItem
            id="visa"
            name="card"
            value="visa"
            text="...6234"
            checked={paymentOption === 'card' && selectedCard === 'visa'}
            onChange={(value) => setSelectedCard(value)}
            option="visa"
            className="mb-2"
          />
          <div className="flex items-center py-4 px-3 text-[0.875rem] leading-[1.25rem] border border-solid border-grey-light-100 border-0 border-b mb-8">
            <img src={add} alt="add payment method" className="mr-2" />
            <span>Add payment method</span>
          </div>
          <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
            Payment methods
          </h4>
          <PaymentOptionItem
            id="card"
            name="payment"
            value="card"
            text="Pay with card"
            checked={paymentOption === 'card'}
            onChange={(value) => setPaymentOption(value)}
            option="card"
            className="mb-2"
          />
          <PaymentOptionItem
            id="transfer"
            name="payment"
            value="transfer"
            text="Bank Transfer"
            checked={paymentOption === 'transfer'}
            onChange={(value) => setPaymentOption(value)}
            option="transfer"
            className="mb-2"
          />
          <PaymentOptionItem
            id="cash"
            name="payment"
            value="cash"
            text="Cash on delivery"
            checked={paymentOption === 'cash'}
            onChange={(value) => setPaymentOption(value)}
            option="cash"
            className="mb-40"
          />
          <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[1rem] leading-[1.5rem]">Total</span>
              <span className="font-[700] text-[1.25rem] leading-[1.75rem]">
                N{' '}
                {cartItems
                  .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
                  .toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </span>
            </div>
            <ButtonSubmit
              disabled={loading}
              loading={loading}
              text="Pay"
              onClick={handleSubmit}
              className="text-white bg-orange"
            />
          </div>
        </section>
      </AppLayout>
    </div>
  )
}

export default RetailerPayment
