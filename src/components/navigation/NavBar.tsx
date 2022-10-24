import React from 'react'
import hamburger from '../../assets/images/hamburger.svg'
import close from '../../assets/images/close.svg'
import logo from '../../assets/images/24Seven.svg'

const NavBar = ({ alternate }: any) => {
  return (
    <nav
      className={`flex justify-between items-center p-4 main ${
        alternate ? 'alt' : ''
      }`}
    >
      <div className="flex items-center">
        {alternate ? (
          <img src={close} alt="close icon" className="w-[1rem] h-[1rem]" />
        ) : (
          <>
            <img
              src={hamburger}
              alt="hamburger icon"
              className="w-[1.313rem] h-[1.125rem] mr-1"
            />
            <img
              src={logo}
              alt="logo"
              className="max-h=[1.5rem] max-w-[6.563rem]"
            />
          </>
        )}
      </div>
      <div className="bg-orange-light text-orange text-[1rem] leading-[1.5rem] flex items-center justify-center rounded-full w-[2rem] h-[2rem]">
        AB
      </div>
    </nav>
  )
}

export default NavBar
