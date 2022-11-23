import React from 'react'

import indomie from '../../../assets/images/indomie.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'
import CartItem from '../../../components/miscellaneous/CartItem'

const num = 2000000

const RetailerCart = () => {
  return (
    <>
      <AppLayout
        cart
        hideLogo
        hideName
        secondaryNav="Cart"
        secondaryNavBack="Store"
      >
        <section>
          {Array(15)
            .fill(1)
            .map((_, i) => (
              <CartItem
                id={""}
                key={i}
                image={indomie}
                name="Indomie Chicken (40g) Carton..."
                price={2000000}
                minOrder={10}
              />
            ))}
          <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[1rem] leading-[1.5rem]">Subtotal</span>
              <span className="font-[700] text-[1.25rem] leading-[1.75rem]">
                N{' '}
                {num.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <ButtonSubmit
              text="Continue to checkout"
              onClick={() => {}}
              className="text-white bg-orange"
            />
          </div>
        </section>
      </AppLayout>
    </>
  )
}

export default RetailerCart
