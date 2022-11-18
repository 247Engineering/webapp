import React from 'react'

import { ProductItemProps } from '../../types'
import OrderCounter from './OrderCounter'

const CartItem = ({
  image,
  name,
  price,
  minOrder,
  unit = 'carton',
  orderAmount,
}: ProductItemProps) => {
  return (
    <div className="py-4 pr-4 border border-solid border-grey-light-100 border-0 border-b flex mb-4 mr-[-1rem]">
      <div className="h-[3.125rem] w-[3.125rem] mr-2">
        <img src={image} alt="product" className="py-2 px-1 w-full h-full" />
      </div>
      <div className="mr-3 max-w-[9.5rem] text-[0.75rem] leading-[1rem]">
        <h6 className="font-[700]">{name}</h6>
        <p>
          {orderAmount} {unit}
        </p>
        <OrderCounter className="mt-3" minOrder={minOrder} />
      </div>
      <div className="flex items-center justify-end grow font-[700] text-[0.875rem] leading-[1.25rem]">
        N {price.toLocaleString()}
      </div>
    </div>
  )
}

export default CartItem
