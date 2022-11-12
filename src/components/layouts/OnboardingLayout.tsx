import React from 'react'
import logo from '../../assets/images/24Seven.svg'

const OnboardingLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col h-full pb-3.5">
      <div className="px-4 pt-10 bg-orange-light">
        <img
          className="mb-5 max-h-[24px] max-w-[105px]"
          src={logo}
          alt="logo"
        />
      </div>
      {children}
    </div>
  )
}

export default OnboardingLayout
