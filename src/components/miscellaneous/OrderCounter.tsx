import React, { CSSProperties, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MoonLoader from 'react-spinners/MoonLoader'

import add from '../../assets/images/add-order.svg'
import remove from '../../assets/images/delete-order.svg'
import reduce from '../../assets/images/reduce-order.svg'

import { OrderCounterProps, RetailerState } from '../../types'
import {
  addToCart,
  clearRetailerStamp,
  removeFromCart,
} from '../../store/features/retailer'
import { AppDispatch, RootState } from '../../store'

const OrderCounter = ({
  className,
  canReduce,
  minOrder = 10,
  id,
  name,
  price,
  image,
  quantity,
  setQuantity,
}: OrderCounterProps) => {
  const override: CSSProperties = {
    borderColor: '#E34B31',
    background: 'transparent',
  }

  const dispatch = useDispatch<AppDispatch>()
  const { loading, retailerStamp } = useSelector<RootState>(
    ({ retailer }) => retailer,
  ) as RetailerState

  useEffect(() => {
    return () => {
      dispatch(clearRetailerStamp())
    }
  }, [dispatch])

  return (
    <div
      className={`flex items-center ${className ? className : ''} relative`}
      onClick={(e) => e.stopPropagation()}
    >
      {loading && retailerStamp === id ? (
        <div
          className={`z-10 absolute top-0 flex justify-center items-center h-full bg-white opacity-80 ${
            quantity ? 'w-[7.75rem]' : 'w-[2rem]'
          }`}
        >
          <MoonLoader cssOverride={override} size={15.6} color="#E34B31" />
        </div>
      ) : null}
      {quantity > 0 ? (
        <>
          {canReduce ? (
            <button
              className="rounded-full w-[2rem] h-[2rem] flex items-center justify-center bg-orange"
              onClick={() => {
                if (quantity - minOrder === 0) {
                  dispatch(
                    removeFromCart({
                      productId: id,
                      onSuccess: () =>
                        setQuantity((quantity: number) => quantity - minOrder),
                    }),
                  )
                } else {
                  dispatch(
                    addToCart({
                      cartItem: {
                        id,
                        quantity: quantity - minOrder,
                        price,
                        name,
                        image,
                      },
                      onSuccess: () =>
                        setQuantity((quantity: number) => quantity - minOrder),
                    }),
                  )
                }
              }}
              disabled={
                quantity <= minOrder || (loading && retailerStamp === id)
              }
            >
              <img src={reduce} alt="reduce" />
            </button>
          ) : (
            <button
              className="rounded-full w-[2rem] h-[2rem] flex items-center justify-center bg-orange"
              onClick={() =>
                dispatch(
                  removeFromCart({
                    productId: id,
                    onSuccess: () => setQuantity(0),
                  }),
                )
              }
              disabled={loading && retailerStamp === id}
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
        onClick={() =>
          dispatch(
            addToCart({
              cartItem: {
                id,
                quantity: quantity + minOrder,
                price,
                name,
                image,
              },
              onSuccess: () =>
                setQuantity((quantity: number) => quantity + minOrder),
            }),
          )
        }
        disabled={loading && retailerStamp === id}
      >
        <img src={add} alt="add" />
      </button>
    </div>
  )
}

export default OrderCounter
