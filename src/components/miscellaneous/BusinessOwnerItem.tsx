import React from 'react'
import { useDispatch } from 'react-redux'

import Status from './Status'

import close from '../../assets/images/close.svg'

import { BusinessOwnerItemProps } from '../../types'
import { AppDispatch } from '../../store'
import { removeOwner } from '../../store/features/distributor'

const BusinessOwnerItem = ({ name, title, id }: BusinessOwnerItemProps) => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="business-owner-item p-4 mb-4 flex justify-between">
      <div>
        <Status
          className="bg-green-light text-green rounded-[6px] px-[0.375rem] py-[0.125rem]"
          text="Completed"
        />
        <h6 className="mt-1 font-[700] leading-[1rem] text-[0.75rem] text-black">
          {name}
        </h6>
        <p className="leading-[1rem] text-[0.75rem] text-black">{title}</p>
      </div>
      <img
        src={close}
        alt="remove icon"
        className="w-[0.938rem] h-[0.938rem] mr-[0.283rem] mt-[0.281rem]"
        onClick={() => dispatch(removeOwner(id))}
      />
    </div>
  )
}

export default BusinessOwnerItem
