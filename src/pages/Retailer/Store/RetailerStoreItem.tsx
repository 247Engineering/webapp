import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import image from '../../../assets/images/image.svg'

import AppLayout from '../../../components/layouts/AppLayout'
import BackButton from '../../../components/forms/BackButton'
import Status from '../../../components/miscellaneous/Status'
import OrderCounter from '../../../components/miscellaneous/OrderCounter'
import ButtonSubmit from '../../../components/forms/ButtonSubmit'

import { AppDispatch, RootState } from '../../../store'
import { ProductState } from '../../../types'
import {
  clearViewedProduct,
  fetchSingleProduct,
} from '../../../store/features/product'

const RetailerShopItem = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { viewedProduct } = useSelector<RootState>(
    ({ product }) => product,
  ) as ProductState

  const { product } = useParams()

  useEffect(() => {
    dispatch(fetchSingleProduct(product as string))
    return () => {
      dispatch(clearViewedProduct())
    }
  }, [dispatch, product])

  return (
    <>
      <AppLayout cart hideLogo hideName>
        <BackButton text="Back" className="ml-[-1rem]" />
        <section className="mt-8">
          <div className="h-[15.5rem] py-4 px-6 mb-7">
            <img
              className="h-full w-full"
              src={viewedProduct?.images[0] || image}
              alt="product"
            />
          </div>
          <div className="mb-2">
            <Status
              className="bg-green-light text-green rounded-[10px] px-2 py-1"
              text={`Save 30%`}
            />
          </div>
          <p className="font-[700] text-[1.25rem] leading-[1.75rem] mb-2">
            {viewedProduct?.name}
          </p>
          <p className="flex items-center text-[1.25rem] leading-[1.75rem] mb-1">
            N{viewedProduct?.price}
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
          <OrderCounter
            minOrder={10}
            className="mb-4 mt-2"
            id={product as string}
            name={viewedProduct?.name}
            price={viewedProduct?.price}
            image={viewedProduct?.images[0]}
          />
          <span className="font-[700] text-[0.75rem] leading-[1rem]">
            Description
          </span>
          <p className="mt-2 mb-[6.5rem] text-[0.875rem] leading-[1.25rem]">
            {viewedProduct?.description}
          </p>
          <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
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
