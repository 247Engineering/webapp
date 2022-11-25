import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { ProductItemProps } from '../../types'
import OrderCounter from './OrderCounter'
import { RootState } from '../../store'
import { RetailerState } from '../../types'

const CartItem = ({
  image,
  name,
  price,
  minOrder,
  unit = 'carton',
  id,
}: ProductItemProps) => {
  const { cartItems } = useSelector<RootState>(
    ({ retailer }) => retailer,
  ) as RetailerState

  const itemInCart = cartItems.find((item) => item.id === id)

  const [quantity, setQuantity] = useState(itemInCart?.quantity || 0)

  return (
    <div className="py-4 pr-4 border border-solid border-grey-light-100 border-0 border-b flex mb-4 mr-[-1rem] capitalize">
      <div className="h-[3.125rem] w-[3.125rem] mr-2">
        <img src={image} alt="product" className="w-full h-full rounded-[4px]" />
      </div>
      <div className="mr-3 max-w-[9.5rem] text-[0.75rem] leading-[1rem]">
        <h6 className="font-[700]">{name}</h6>
        <p>
          {quantity} {unit}
          {quantity > 1 ? 's' : ''}
        </p>
        <OrderCounter
          className="mt-3"
          minOrder={minOrder}
          id={id}
          name={name}
          price={price}
          image={image}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <div className="flex items-center justify-end grow font-[700] text-[0.875rem] leading-[1.25rem]">
        N {price.toLocaleString()}
      </div>
    </div>
  )
}

export default CartItem
