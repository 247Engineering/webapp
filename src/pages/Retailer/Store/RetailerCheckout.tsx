import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import priority from '../../../assets/images/priority.svg'
import priorityChecked from '../../../assets/images/priority-checked.svg'
import standard from '../../../assets/images/standard.svg'
import standardChecked from '../../../assets/images/standard-checked.svg'
import schedule from '../../../assets/images/schedule.svg'
import scheduleChecked from '../../../assets/images/schedule-checked.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import LocationInput from '../../../components/forms/LocationInput'
import Input from '../../../components/forms/Input'
import OnboardingRadio from '../../../components/forms/OnboardingRadio'
import Map from '../../../components/miscellaneous/Map'
import OrderSummary from '../../../components/miscellaneous/OrderSummary'

import { Address, DeliveryOptions, RetailerState } from '../../../types'
import { AppDispatch, RootState } from '../../../store'
import { clearRetailerStamp, placeOrder } from '../../../store/features/retailer'
import * as ROUTES from '../../../routes'

const deliveryOptionMap = {
  priority: 1,
  standard: 2,
  schedule: 3,
}

const RetailerCheckout = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { cartItems, loading, orderId, retailerStamp } = useSelector<RootState>(
    ({ retailer }) => retailer,
  ) as RetailerState

  const [location, setLocation] = useState<Address | null>(null)
  const [locationDropdown, setLocationDropdown] = useState(false)
  const [instructions, setInstructions] = useState('')
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOptions>(
    'standard',
  )
  const [type, setType] = useState('delivery')

  const handleChange = (value: DeliveryOptions) => {
    setDeliveryOption(value)
  }

  const handleSubmit = () => {
    dispatch(
      placeOrder({
        location: location as Address,
        delivery_instructions: instructions,
        ...(type === 'delivery'
          ? { delivery_options: deliveryOptionMap[deliveryOption] }
          : { pickup_options: deliveryOptionMap[deliveryOption] }),
      }),
    )
  }

  useEffect(() => {
    if (retailerStamp) navigate(ROUTES.RETAILER.PAYMENT_FOR(orderId as string))
    return () => {
      dispatch(clearRetailerStamp())
    }
  }, [retailerStamp, orderId, navigate, dispatch])

  return (
    <div onClick={() => setLocationDropdown(false)} className="h-full">
      <AppLayout
        cart
        hideLogo
        hideName
        secondaryNav="Checkout"
        secondaryNavBack="Cart"
        back={ROUTES.RETAILER.CART}
      >
        <section>
          <div className="p-1 bg-grey-light-200 rounded-[10px] flex items-center justify-between font-[700] text-[0.875rem] leading-[1.25rem] mb-8">
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] p-[0.625rem] w-[9.75rem] ${
                type === 'delivery' ? 'text-orange bg-orange-light-100' : ''
              }`}
              onClick={() => setType('delivery')}
            >
              Delivery
            </button>
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] p-[0.625rem] w-[9.75rem] ${
                type === 'pickup' ? 'text-orange bg-orange-light-100' : ''
              }`}
              onClick={() => {
                if (type === 'delivery' && deliveryOption === 'priority')
                  setDeliveryOption('standard')
                setType('pickup')
              }}
            >
              Pick-up
            </button>
          </div>
          {type === 'delivery' ? (
            <>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
                Address
              </h4>
              <div className="mb-4">
                <LocationInput
                  label="Location"
                  setLocation={setLocation}
                  dropdown={locationDropdown}
                  setDropdown={setLocationDropdown}
                />
              </div>
              <div>
                <Input
                  label="Delivery instructions"
                  value={instructions}
                  onChange={setInstructions}
                  type="textarea"
                  placeholder="Add instructions"
                />
              </div>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem] mt-8 mb-6">
                Delivery options
              </h4>
              <OnboardingRadio
                id="priority"
                name="delivery"
                value="priority"
                img={priority}
                imgChecked={priorityChecked}
                textPrimary="Priority - N5,000"
                textSecondary="Same day delivery - Directly to you"
                checked={deliveryOption === 'priority'}
                onChange={handleChange}
                className="mb-4"
              />
              <OnboardingRadio
                id="standard"
                name="delivery"
                value="standard"
                img={standard}
                imgChecked={standardChecked}
                textPrimary="Standard"
                textSecondary="24-48 hour delivery"
                checked={deliveryOption === 'standard'}
                onChange={handleChange}
                className="mb-4"
              />
              <OnboardingRadio
                id="schedule"
                name="delivery"
                value="schedule"
                img={schedule}
                imgChecked={scheduleChecked}
                textPrimary="Schedule"
                textSecondary="Select a time"
                checked={deliveryOption === 'schedule'}
                onChange={handleChange}
                className="mb-8"
              />
            </>
          ) : (
            <>
              <div className="rounded-[10px] w-full h-[7.5rem] mb-8 overflow-hidden">
                <Map
                  center={{ lat: 9.0765, lng: 7.3986 }}
                  lat={9.0765}
                  lng={7.3986}
                />
              </div>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
                Pick-up locations
              </h4>
              <h5 className="font-[700] text-[0.875rem] leading[1.25rem] mb-1">
                Femadons Depot - Victoria Island
              </h5>
              <p className="text-[0.875rem] leading[1.25rem] text-black-100 mb-8">
                365, Adetokunbo Ademola Street, Victoria Island, Lagos{' '}
              </p>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
                Pick-up time
              </h4>
              <OnboardingRadio
                id="standard"
                name="delivery"
                value="standard"
                img={standardChecked}
                imgChecked={standardChecked}
                textPrimary="Standard"
                textSecondary="24-48 hour delivery"
                checked={deliveryOption === 'standard'}
                onChange={handleChange}
                className="mb-4"
              />
              <OnboardingRadio
                id="schedule"
                name="delivery"
                value="schedule"
                img={schedule}
                imgChecked={schedule}
                textPrimary="Schedule"
                textSecondary="Select a time"
                checked={deliveryOption === 'schedule'}
                onChange={handleChange}
                className="mb-8"
              />
            </>
          )}
          <OrderSummary cartItems={cartItems} addItems className="mb-28" />
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
              disabled={!location || loading}
              loading={loading}
              text="Place order"
              onClick={handleSubmit}
              className="text-white bg-orange"
            />
          </div>
        </section>
      </AppLayout>
    </div>
  )
}

export default RetailerCheckout
