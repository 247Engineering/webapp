import React from 'react'

import add from '../../assets/images/add-order.svg'

const num = 5000000

const OrderSummary = ({ addItems }: { addItems?: boolean }) => {
  return (
    <div>
      <div className="flex items-center justify-between font-[700] mb-2">
        <h4 className="text-[1rem] leading-[1.5rem]">Order details</h4>
        {addItems ? (
          <button className="bg-orange text-white rounded-[10px] py-2 pl-[0.594rem] pr-4 text-[0.75rem] leading-[1rem] flex items-center">
            <img
              src={add}
              className="mr-[0.594rem] w-[0.813rem] h-[0.813rem]"
              alt="add"
            />
            Add items
          </button>
        ) : null}
      </div>
      <div className="py-4 border border-solid border-grey-light-100 border-0 border-b flex justify-between text-[0.75rem] leading-[1rem]">
        <div className="flex flex-col">
          <span className="font-[700]">Indomie Chicken (40g) Carton...</span>
          <span className="text-black-100">10 Cartons</span>
        </div>
        <span className="">N {num.toLocaleString()}</span>
      </div>
      <div className="py-4 border border-solid border-grey-light-100 border-0 border-b flex justify-between text-[0.75rem] leading-[1rem]">
        <div className="flex flex-col">
          <span className="font-[700]">Indomie Chicken (40g) Carton...</span>
          <span className="text-black-100">10 Cartons</span>
        </div>
        <span className="">N {num.toLocaleString()}</span>
      </div>
      <div className="py-4 border border-solid border-grey-light-100 border-0 border-b flex justify-between text-[0.75rem] leading-[1rem]">
        <div className="flex flex-col">
          <span className="font-[700]">Indomie Chicken (40g) Carton...</span>
          <span className="text-black-100">10 Cartons</span>
        </div>
        <span>N {num.toLocaleString()}</span>
      </div>
      <div className="pt-6 pb-8 text-[0.75rem] leading-[1rem]">
        <div className="mb-2 flex justify-between items-center">
          <span>Subtotal</span>
          <span>N {num.toLocaleString()}</span>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <span>Delivery Fee</span>
          <span>N {num.toLocaleString()}</span>
        </div>
        <div className="mb-2 flex justify-between items-center">
          <span>Service Fee</span>
          <span>N {num.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center font-[700] text-[0.875rem] leading-[1.25rem]">
          <span>Total</span>
          <span>N {num.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
