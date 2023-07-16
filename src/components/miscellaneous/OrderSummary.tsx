import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import add from "../../assets/images/add-order.svg";

import { CartItem } from "../../types";
import * as ROUTES from "../../routes";

const OrderSummary = ({
  addItems,
  className,
  cartItems,
  deliveryFee = 0,
  serviceFee = 0,
}: {
  addItems?: boolean;
  className?: string;
  cartItems: CartItem[];
  deliveryFee?: number;
  serviceFee?: number;
}) => {
  const navigate = useNavigate();

  const total = useMemo(
    () => cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
    [cartItems]
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between font-[700] mb-2">
        <h4 className="text-[1rem] leading-[1.5rem]">Order details</h4>
        {addItems ? (
          <button
            onClick={() => navigate(ROUTES.RETAILER.DASHBOARD)}
            className="bg-orange text-white rounded-[10px] py-2 pl-[0.594rem] pr-4 text-[0.75rem] leading-[1rem] flex items-center"
          >
            <img
              src={add}
              className="mr-[0.594rem] w-[0.813rem] h-[0.813rem]"
              alt="add"
            />
            Add items
          </button>
        ) : null}
      </div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="py-4 border border-solid border-grey-light-100 border-0 border-b flex justify-between text-[0.75rem] leading-[1rem]"
        >
          <div className="flex flex-col" key={item.id}>
            <span className="font-[700] h-[2rem] text-ellipsis">
              {item.name}
            </span>
            <span className="text-black-100">{item.quantity} Cartons</span>
          </div>
          <span className="">N {item.price.toLocaleString()}</span>
        </div>
      ))}

      <div className="pt-6 pb-8 text-[0.75rem] leading-[1rem]">
        <div className="mb-2 flex justify-between items-center">
          <span>Subtotal</span>
          <span>N {total.toLocaleString()}</span>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <span>Delivery Fee</span>
          <span>N {deliveryFee.toLocaleString()}</span>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <span>Service Fee</span>
          <span>N {serviceFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center font-[700] text-[0.875rem] leading-[1.25rem]">
          <span>Total</span>
          <span>N {(total + deliveryFee + serviceFee).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
