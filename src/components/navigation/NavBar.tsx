import React from 'react'
import { useSelector } from 'react-redux'

import hamburger from '../../assets/images/hamburger.svg'
import close from '../../assets/images/close.svg'
import logo from '../../assets/images/24Seven.svg'
import locationIcon from '../../assets/images/location.svg'
import navbarSearch from '../../assets/images/navbar-search.svg'
import cartIcon from '../../assets/images/cart.svg'

import BackButton from '../forms/BackButton'

import { AppLayoutProps, AuthState, RetailerState } from '../../types'
import { RootState } from '../../store'

const NavBar = ({
  alternate,
  onClose,
  hideLogo,
  hideName,
  location,
  search,
  cart,
  setShowSideBar,
  secondaryNav,
  secondaryNavBack,
}: AppLayoutProps) => {
  const { firstName, lastName } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState
  const { cartItems } = useSelector<RootState>(
    ({ retailer }) => retailer,
  ) as RetailerState

  return (
    <section className="sticky top-0 left-0 right-0 bg-white z-40">
      <nav
        className={`flex justify-between items-center p-4 main text-black ${
          alternate ? 'alt' : ''
        }`}
      >
        <div className="flex items-center">
          {alternate ? (
            <img
              src={close}
              alt="close icon"
              className="w-[1rem] h-[1rem]"
              onClick={onClose}
            />
          ) : (
            <>
              <img
                src={hamburger}
                alt="hamburger icon"
                className="w-[1.313rem] h-[1.125rem]"
                onClick={() => {
                  if (setShowSideBar) setShowSideBar(true)
                }}
              />
              {!hideLogo ? (
                <img
                  src={logo}
                  alt="logo"
                  className="max-h-[1.5rem] max-w-[6.563rem] ml-1"
                />
              ) : null}
              {location ? (
                <div className="p flex items-center bg-grey rounded-[50px] py-[0.375rem] pr-[0.875rem] pl-[0.532rem] ml-[0.594rem]">
                  <img
                    src={locationIcon}
                    className="w-[0.936rem] h-[1.248rem] mr-[0.657rem]"
                    alt="location"
                  />
                  {location}
                </div>
              ) : null}
            </>
          )}
        </div>
        <div className="flex items-center">
          {search ? (
            <img
              src={navbarSearch}
              className="w-[2rem] h-[2rem]"
              alt="search"
            />
          ) : null}
          {cart ? (
            <div className="flex items-center justify-center rounded-full w-[2rem] h-[2rem] ml-2 mr-[0.75rem] bg-orange-light-100 relative">
              <img src={cartIcon} alt="cart" />
              <span className="absolute left-[23px] top-[-9px] text-white bg-orange font-[700] text-[0.625rem] leading-[0.875rem] rounded-[100px] px-1 py-[2px]">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            </div>
          ) : null}
          {!hideName ? (
            <div className="bg-orange-light text-orange text-[1rem] leading-[1.5rem] flex items-center justify-center rounded-full w-[2rem] h-[2rem] uppercase">
              {firstName ? firstName[0] : 'A'}
              {lastName ? lastName[0] : 'B'}
            </div>
          ) : null}
        </div>
      </nav>
      {secondaryNav ? (
        <div className="p-4 pt-8 shadow-sm-alt">
          <BackButton text={secondaryNavBack as string} />
          <p className="font-[700] text-[1.25rem] leading-[1.75rem]">
            {secondaryNav}
          </p>
        </div>
      ) : null}
    </section>
  )
}

export default NavBar
