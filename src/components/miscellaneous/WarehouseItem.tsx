import React from 'react'
import distributor from '../../assets/images/distributor-checked.svg'
import { WarehouseItemProp } from '../../types'

const WarehouseItem = ({ textPrimary, textSecondary }: WarehouseItemProp) => {
  return (
    <div className="warehouse-item mr-[-1rem]">
      <img
        src={distributor}
        alt="warehouse icon"
        className="h-[2rem] w-[2rem] mr-2"
      />
      <div className="flex flex-col justify-between">
        <h6 className="hover:text-purple font-[700] text-[0.75rem] leading-[1rem]">
          {textPrimary}
        </h6>
        <p className="text-[0.75rem] leading-[1rem]">{textSecondary}</p>
      </div>
    </div>
  )
}

export default WarehouseItem
