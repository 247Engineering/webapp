import React from 'react'

import indomie from '../../../assets/images/indomie.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import BackButton from '../../../components/forms/BackButton'
import Status from '../../../components/miscellaneous/Status'
import OrderCounter from '../../../components/miscellaneous/OrderCounter'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'

const RetailerShopItem = () => {
  return (
    <>
      <AppLayout cart hideLogo hideName>
        <BackButton text="Back" className="ml-[-1rem]" />
        <section className="mt-8">
          <div className="h-[15.5rem] py-4 px-6 mb-7">
            <img className="h-full w-full" src={indomie} alt="product" />
          </div>
          <div className="mb-2">
            <Status
              className="bg-green-light text-green rounded-[10px] px-2 py-1"
              text={`Save 30%`}
            />
          </div>
          <p className="font-[700] text-[1.25rem] leading-[1.75rem] mb-2">
            Indomie Chicken Hungry Man Size (200g)
          </p>
          <p className="flex items-center text-[1.25rem] leading-[1.75rem] mb-1">
            N5000
            <span className="capitalize text-[0.75rem] leading-[1rem] text-black-100 ml-2">
              (Per carton)
            </span>
          </p>
          <p className="text-[0.75rem] leading-[1rem] text-black-100 capitalize mb-4">
            Min Order (10 cartons)
          </p>
          <span className="mb-2 font-[700] text-[0.75rem] leading-[1rem]">
            Quantity
          </span>
          <OrderCounter minOrder={10} className="mb-4 mt-2" />
          <span className="font-[700] text-[0.75rem] leading-[1rem]">
            Description
          </span>
          <p className="mt-2 mb-[3.438rem] text-[0.875rem] leading-[1.25rem]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis tortor
            nunc, in metus, pellentesque est ultricies enim ac. Hac in enim
            nunc, viverra porttitor. Egestas quisque nulla sit augue commodo.
            Commodo vestibulum sit netus risus.
          </p>
          <div className="p-4 w-full fixed">
            <ButtonSubmit
              text="Add to cart"
              onClick={() => {}}
              className="text-white bg-orange"
            />
          </div>
        </section>
      </AppLayout>
    </>
  )
}

export default RetailerShopItem
