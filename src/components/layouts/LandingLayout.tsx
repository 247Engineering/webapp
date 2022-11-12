import React from 'react'
import logo from '../../assets/images/24Seven.svg'

const LandingLayout = ({ children }: any) => {
  return (
    <div className="px-4 pt-10 pb-3.5 h-full flex flex-col">
      <img
        className="mb-5 max-h-[1.5rem] max-w-[6.563rem]"
        src={logo}
        alt="logo"
      />
      {children}
    </div>
  )
}

export default LandingLayout
