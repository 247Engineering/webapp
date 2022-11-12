import React from 'react'
import { useNavigate } from 'react-router-dom'

import back from '../../assets/images/back.svg'

const BackButton = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => {
  const navigate = useNavigate()

  return (
    <button
      className={`flex items-center text-orange font-[700] text-[0.75rem] leading-[1rem] py-2 pr-4 pl-[0.667rem] ${
        className ? className : ''
      }`}
      onClick={() => navigate(-1)}
    >
      <img
        src={back}
        className="w-[0.667rem] h-[0.667rem] mr-[0.667rem]"
        alt="back"
      />
      {text}
    </button>
  )
}

export default BackButton
