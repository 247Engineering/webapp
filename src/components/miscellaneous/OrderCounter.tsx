import React, { useState } from 'react'

import add from '../../assets/images/add-order.svg'
import remove from '../../assets/images/delete-order.svg'
import reduce from '../../assets/images/reduce-order.svg'

import { OrderCounterProps } from '../../types'

const OrderCounter = ({
  className,
  canReduce,
  minOrder = 1,
}: OrderCounterProps) => {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className={`flex items-center ${className ? className : ''}`}>
      {quantity > 0 ? (
        <>
          {canReduce ? (
            <button
              className="rounded-full w-[2rem] h-[2rem] flex items-center justify-center bg-orange"
              onClick={() => setQuantity((quantity) => quantity - minOrder)}
              disabled={quantity <= minOrder}
            >
              <img src={reduce} alt="reduce" />
            </button>
          ) : (
            <button
              className="rounded-full w-[2rem] h-[2rem] flex items-center justify-center bg-orange"
              onClick={() => setQuantity(0)}
            >
              <img src={remove} alt="delete" />
            </button>
          )}
          <input
            type="number"
            className="w-[2.688rem] py-[0.375rem] px-2 text-black-100 p border border-solid border-grey-light mx-2 rounded-[8px]"
            value={quantity}
            min={minOrder}
            //@ts-ignore
            onChange={(e) => setQuantity(e.target.value)}
          />
        </>
      ) : null}
      <button
        className="rounded-full w-[2rem] h-[2rem] flex items-center justify-center bg-orange"
        onClick={() => setQuantity((quantity) => quantity + minOrder)}
      >
        <img src={add} alt="add" />
      </button>
    </div>
  )
}

export default OrderCounter
