import React from 'react'
import logo from '../../assets/images/24Seven.svg'

const LandingLayout = ({ children }: any) => {
  return (
    <div className="px-4 pt-10 pb-3.5 h-full flex flex-col">
      <img
        className="mb-5 w-[7.813rem] h-[2rem]"
        src={logo}
        alt="logo"
      />
      {children}
    </div>
  )
}

export default LandingLayout
