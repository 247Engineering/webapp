import React from 'react'

import Status from './Status'
import OrderCounter from './OrderCounter'

import { ProductItemProps } from '../../types'

const ProductItem = ({
  discount,
  image,
  name,
  price,
  minOrder,
  unit = 'carton',
}: ProductItemProps) => {
  return (
    <div className="py-4 w-full min-h-[10.625rem] border border-solid border-grey-light border-0 border-b flex mb-2">
      <div className="w-[29%] py-4 px-3">
        <img src={image} className="w-[4.25rem] h-[4.25rem]" alt="product" />
      </div>
      <div className="w-[71%] flex flex-col pl-4">
        {discount ? (
          <div>
            <Status
              className="bg-green-light text-green rounded-[6px] px-[0.375rem] py-[0.125rem] mb-[0.375rem] w-auto"
              text={`Save ${discount}%`}
            />
          </div>
        ) : null}
        <p className="max-w-[13.75rem] font-[700] text-[0.75rem] leading-[1rem] mb-1">
          {name}
        </p>
        <p className="flex items-center text-[1rem] leading-[1.5rem]">
          N{price}
          <span className="capitalize text-[0.625rem] leading-[0.875rem] text-black-100 ml-1">
            (Per {unit})
          </span>
        </p>
        <p className="text-[0.625rem] leading-[0.875rem] text-black-100 capitalize mb-2">
          Min Order ({minOrder} {unit}s)
        </p>
        <OrderCounter minOrder={minOrder} className="mt-auto" />
      </div>
    </div>
  )
}

export default ProductItem
