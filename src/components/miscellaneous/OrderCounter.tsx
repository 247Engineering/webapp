import React, { CSSProperties, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

import add from "../../assets/images/add-order.svg";
import remove from "../../assets/images/delete-order.svg";
import reduce from "../../assets/images/reduce-order.svg";

import {
  AuthState,
  DistributorState,
  OrderCounterProps,
  RetailerState,
} from "../../types";
import {
  addToCart,
  clearRetailerStamp,
  removeFromCart,
} from "../../store/features/retailer";
import {
  addToWarehouseCart,
  resetWarehouseStamp,
  removeFromWarehouseCart,
} from "../../store/features/distributor";
import { AppDispatch, RootState } from "../../store";

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
    borderColor: "#E34B31",
    background: "transparent",
  };

  const dispatch = useDispatch<AppDispatch>();

  const { type } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const { loading: retailerLoading, retailerStamp } = useSelector<RootState>(
    ({ retailer }) => retailer
  ) as RetailerState;

  const { loading: distributorLoading, warehouseStamp } =
    useSelector<RootState>(
      ({ distributor }) => distributor
    ) as DistributorState;

  const loading = type === "retailer" ? retailerLoading : distributorLoading;
  const stamp = type === "retailer" ? retailerStamp : warehouseStamp;
  const addItemToCart = type === "retailer" ? addToCart : addToWarehouseCart;
  const removeItemFromCart = type === "retailer" ? removeFromCart : removeFromWarehouseCart;
  const clearStamp = type === "retailer" ? clearRetailerStamp : resetWarehouseStamp;

  useEffect(() => {
    return () => {
      dispatch(clearStamp());
    };
  }, [dispatch, clearStamp]);

  return (
    <div
      className={`flex items-center ${className ? className : ""} relative`}
      onClick={(e) => e.stopPropagation()}
    >
      {loading && stamp === id ? (
        <div
          className={`z-10 absolute top-0 flex justify-center items-center h-full bg-white opacity-80 ${
            quantity ? "w-[7.75rem]" : "w-[2rem]"
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
                    removeItemFromCart({
                      productId: id,
                      onSuccess: () =>
                        setQuantity((quantity: number) => quantity - minOrder),
                    })
                  );
                } else {
                  dispatch(
                    addToCart({
                      cartItem: {
                        id,
                        quantity: quantity - minOrder,
                        price,
                        name,
                        image,
                        minOrder,
                      },
                      onSuccess: () =>
                        setQuantity((quantity: number) => quantity - minOrder),
                    })
                  );
                }
              }}
              disabled={
                quantity <= minOrder || (loading && stamp === id)
              }
            >
              <img src={reduce} alt="reduce" />
            </button>
          ) : (
            <button
              className="rounded-full w-[2rem] h-[2rem] flex items-center justify-center bg-orange"
              onClick={() =>
                dispatch(
                  removeItemFromCart({
                    productId: id,
                    onSuccess: () => setQuantity(0),
                  })
                )
              }
              disabled={loading && stamp === id}
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
            onChange={(e) => setQuantity(Number(e.target.value))}
            onBlur={(e) =>
              dispatch(
                addItemToCart({
                  cartItem: {
                    id,
                    quantity: Number(quantity),
                    price,
                    name,
                    image,
                    minOrder,
                  },
                  onSuccess: () => {},
                })
              )
            }
          />
        </>
      ) : null}
      <button
        className="rounded-full w-[2rem] h-[2rem] flex items-center justify-center bg-orange"
        onClick={() =>
          dispatch(
            addItemToCart({
              cartItem: {
                id,
                quantity: quantity + minOrder,
                price,
                name,
                image,
                minOrder,
              },
              onSuccess: () =>
                setQuantity((quantity: number) => Number(quantity) + minOrder),
            })
          )
        }
        disabled={loading && stamp === id}
      >
        <img src={add} alt="add" />
      </button>
    </div>
  );
};

export default OrderCounter;
