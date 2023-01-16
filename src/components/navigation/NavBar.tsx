import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import hamburger from "../../assets/images/hamburger.svg";
import close from "../../assets/images/close.svg";
import logo from "../../assets/images/24Seven.svg";
import locationIcon from "../../assets/images/location.svg";
import navbarSearch from "../../assets/images/navbar-search.svg";
import cartIcon from "../../assets/images/cart.svg";
import profile from "../../assets/images/profile.svg";

import BackButton from "../forms/BackButton";

import { AppLayoutProps, RetailerState, AuthContextType } from "../../types";
import { RootState } from "../../store";
import * as ROUTES from "../../routes";
import { useAuth } from "../../hooks/useAuth";

const NavBar = ({
  alternate,
  onClose,
  hideLogo,
  location,
  search,
  cart,
  setShowSideBar,
  showSideBar,
  secondaryNav,
  secondaryNavBack,
  back,
}: AppLayoutProps) => {
  const navigate = useNavigate();

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
          {alternate ? (
            <img
              src={close}
              alt="close icon"
              className="w-[1rem] h-[1rem]"
              onClick={onClose}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className="flex items-center px-[0.625rem]">
          {!alternate ? (
            <img
              src={profile}
              alt="profile icon"
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          ) : null}
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
          {!alternate ? (
            <img
              src={hamburger}
              alt="hamburger icon"
              className="ml-7"
              onClick={() => {
                if (setShowSideBar) setShowSideBar(!showSideBar);
              }}
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
