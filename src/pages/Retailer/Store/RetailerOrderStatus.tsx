import React from 'react'

import orderProgress from '../../../assets/images/order-progress-complete.svg'
import collectedProgress from '../../../assets/images/collected-progress.svg'
import deliveryProgress from '../../../assets/images/delivery-progress.svg'
import pickupProgress from '../../../assets/images/pickup-progress.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import Map from '../../../components/miscellaneous/Map'
import OrderSummary from '../../../components/miscellaneous/OrderSummary'
import IconProgressBar from '../../../components/miscellaneous/IconProgressBar'

const RetailerCheckout = () => {
  return (
    <>
      <AppLayout
        cart
        hideLogo
        hideName
        secondaryNav="Order #FD12343544"
        secondaryNavBack="Orders"
      >
        <section>
          <div className="rounded-[8px] w-full h-[8.5rem] mb-8 overflow-hidden">
            <Map
              center={{ lat: 9.0765, lng: 7.3986 }}
              lat={9.0765}
              lng={7.3986}
            />
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem]">
                Order confirmed
              </h4>
              <p className="text-black-100 text-[0.875rem] leading-[1.25rem]">
                We are preparing your order
              </p>
            </div>
            <div>
              <h4 className="font-[700] text-[0.75rem] leading-[1rem]">
                Delivery date
              </h4>
              <p className="text-black-100 text-[0.75rem] leading-[1rem]">
                Tue 8th, Nov
              </p>
            </div>
          </div>
          <div className="mb-8">
            <IconProgressBar
              step={1}
              totalSteps={3}
              images={[
                orderProgress,
                pickupProgress,
                deliveryProgress,
                collectedProgress,
              ]}
            />
          </div>
          <OrderSummary />
          <h4 className="font-[700] text-[1rem] leading-[1.5rem]">Address</h4>
          <p className="w-[11.75rem] text-[0.875rem] leading-[1.25rem] mb-20">
            567 Chevron Drive, Chevron, Lekki, 101215, USA
          </p>
          <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
            <ButtonSubmit
              text="Confirm order received"
              onClick={() => {}}
              className="text-white bg-orange"
            />
          </div>
        </section>
      </AppLayout>
    </>
  )
}

export default RetailerCheckout
