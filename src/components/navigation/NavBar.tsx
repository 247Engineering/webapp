import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import hamburger from "../../assets/images/hamburger.svg";
import close from "../../assets/images/close.svg";
import logo from "../../assets/images/24Seven.svg";
import locationIcon from "../../assets/images/location.svg";
import navbarSearch from "../../assets/images/navbar-search.svg";
import cartIcon from "../../assets/images/cart.svg";
import boxIcon from "../../assets/images/box.svg";
import boxIconSelected from "../../assets/images/deliveries-selected.svg";
import walletIcon from "../../assets/images/wallet.svg";
import walletIconSelected from "../../assets/images/wallet-selected.svg";
// import profile from "../../assets/images/profile.svg";

import BackButton from "../forms/BackButton";

import { AppLayoutProps, RetailerState, AuthContextType } from "../../types";
import { RootState } from "../../store";
import * as ROUTES from "../../routes";
import { useAuth } from "../../hooks/useAuth";

const NavBar = ({
  alternate,
  onClose,
  hideLogo,
  hideHamburger,
  location,
  search,
  cart,
  logistics,
  wallet,
  setShowSideBar,
  showSideBar,
  secondaryNav,
  secondaryNavBack,
  back,
}: AppLayoutProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { cartItems } = useSelector<RootState>(
    ({ retailer }) => retailer
  ) as RetailerState;

  const { user } = useAuth() as AuthContextType;
  const userType =
    user?.type === "warehouse" ? "DISTRIBUTOR" : user?.type.toUpperCase();

  return (
    <section className="sticky top-0 left-0 right-0 bg-white z-40">
      <nav
        className={`flex justify-between items-center p-4 main text-black ${
          alternate ? "alt" : ""
        }`}
      >
        <div className="flex items-center">
          {!hideLogo ? (
            <img
              src={logo}
              alt="logo"
              className="ml-1 w-[7.813rem] h-[2rem]"
              onClick={() =>
                navigate(ROUTES[userType as keyof typeof ROUTES].DASHBOARD)
              }
            />
          ) : null}
          {location ? (
            <div className="p flex items-center bg-grey rounded-[50px] py-[0.375rem] pr-[0.875rem] pl-[0.532rem] ml-[0.594rem] max-w-[8.875rem]">
              <img
                src={locationIcon}
                className="w-[0.936rem] h-[1.248rem] mr-[0.657rem]"
                alt="location"
              />
              <span className="text-ellipsis whitespace-nowrap overflow-hidden">
                {location}
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex items-center px-[0.625rem]">
          {search ? (
            <img
              src={navbarSearch}
              className="w-[2rem] h-[2rem] ml-7"
              alt="search"
            />
          ) : null}
          {cart ? (
            <div
              className="flex items-center justify-center rounded-full w-[2rem] h-[2rem] ml-7 relative"
              onClick={() => navigate(ROUTES.RETAILER.CART)}
            >
              <img
                src={cartIcon}
                alt="cart"
                className="w-[1.25rem] h-[1.125rem]"
              />
              <span className="absolute left-[16px] top-[-5px] text-white bg-orange font-[700] text-[0.625rem] leading-[0.875rem] rounded-[100px] px-1 py-[2px]">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            </div>
          ) : null}
          {logistics ? (
            <div
              className="flex items-center justify-center rounded-full w-[2rem] h-[2rem] ml-7 relative mr-[-0.5rem]"
              onClick={() => {}}
            >
              <img
                src={
                  pathname === ROUTES.LOGISTICS.DELIVERIES
                    ? boxIconSelected
                    : boxIcon
                }
                alt="cart"
                className="w-[1.5rem] h-[1.5rem]"
              />
              {pathname !== ROUTES.LOGISTICS.DELIVERIES ? (
                <span className="absolute left-[16px] top-[-5px] text-white bg-orange font-[700] text-[0.625rem] leading-[0.875rem] rounded-[100px] px-1 py-[2px]">
                  {logistics}
                </span>
              ) : null}
            </div>
          ) : null}
          {wallet ? (
            <img
              src={
                pathname === ROUTES.LOGISTICS.WALLET
                  ? walletIconSelected
                  : walletIcon
              }
              alt="wallet icon"
              onClick={() => {}}
              className="ml-7"
            />
          ) : null}
          {/* {!alternate ? (
            <img
              src={profile}
              alt="profile icon"
              onClick={() => {}}
              className="ml-7"
            />
          ) : null} */}
          {!alternate && !hideHamburger ? (
            <img
              src={hamburger}
              alt="hamburger icon"
              className="ml-7"
              onClick={() => {
                if (setShowSideBar) setShowSideBar(!showSideBar);
              }}
            />
          ) : null}
          {alternate ? (
            <img
              src={close}
              alt="close icon"
              className="w-[1rem] h-[1rem]"
              onClick={onClose}
            />
          ) : null}
        </div>
      </nav>
      {secondaryNav ? (
        <div className="p-4 pt-8 shadow-sm-alt">
          <BackButton text={secondaryNavBack as string} goTo={back} />
          <p className="font-[700] text-[1.25rem] leading-[1.75rem]">
            {secondaryNav}
          </p>
        </div>
      ) : null}
    </section>
  );
};

export default NavBar;
