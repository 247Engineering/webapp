import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/24Seven2.svg";
import dashboard from "../../assets/images/dashboard-icon.svg";
import products from "../../assets/images/product-icon.svg";
import orders from "../../assets/images/orders-icon.svg";
import warehouses from "../../assets/images/warehouses-icon.svg";
import operations from "../../assets/images/operations-icon.svg";
import settings from "../../assets/images/settings-icon.svg";
import logoutIcon from "../../assets/images/logout.svg";

import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types";
import * as ROUTES from "../../routes";

const SideBar = ({ show }: { show: boolean }) => {
  const { logout, user } = useAuth() as AuthContextType;
  const userType =
    user?.type === "warehouse" ? "DISTRIBUTOR" : user?.type.toUpperCase();

  const sideBarMap = {
    DISTRIBUTOR: [
      {
        link: ROUTES.DISTRIBUTOR.DASHBOARD,
        text: "Dashboard",
        image: dashboard,
      },
      {
        link: ROUTES.DISTRIBUTOR.WAREHOUSES,
        text: "Warehouses",
        image: warehouses,
      },
      ...(user?.type === "warehouse"
        ? [
            {
              link: ROUTES.DISTRIBUTOR.WAREHOUSE_ORDERS,
              text: "Orders",
              image: orders,
            },
          ]
        : []),
      ...(user?.type === "distributor"
        ? [
            {
              link: ROUTES.DISTRIBUTOR.COUPONS,
              text: "Coupons",
              image: operations,
            },
          ]
        : []),
      { link: ROUTES.DISTRIBUTOR.DASHBOARD, text: "Settings", image: settings },
    ],
    RETAILER: [
      { link: ROUTES.RETAILER.DASHBOARD, text: "Products", image: products },
      { link: ROUTES.RETAILER.ORDERS, text: "Orders", image: orders },
      { link: ROUTES.RETAILER.DASHBOARD, text: "Settings", image: settings },
    ],
    LOGISTICS: [
      { link: ROUTES.LOGISTICS.DASHBOARD, text: "Dashboard", image: dashboard },
      { link: ROUTES.LOGISTICS.DASHBOARD, text: "Settings", image: settings },
    ],
  };

  return user ? (
    <aside
      className={`absolute top-0 bottom-0 z-50 min-h-screen w-full max-w-[16.875rem] bg-[#461A53] p-4 text-white font-[700] text-[0.875rem] leading-[1.25rem] ease-in-out transition-all duration-300 ${
        show ? "translate-x-0" : "translate-x-[-16.875rem]"
      }`}
    >
      <img src={logo} alt="logo" className="mb-8 w-[7.813rem] h-[2rem]" />
      {sideBarMap[userType as "DISTRIBUTOR" | "RETAILER"].map((item) => (
        <Link
          key={item.text}
          to={item.link}
          className="px-2 py-3.5 flex flex-items"
        >
          <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
            <img src={item.image} alt="dashboard" />
          </div>
          <p>{item.text}</p>
        </Link>
      ))}
      <div className="px-2 py-3.5 flex flex-items" onClick={() => logout()}>
        <div className="w-[1.25rem] h-[1.25rem] flex items-center justify-center mr-2">
          <img src={logoutIcon} alt="logout" />
        </div>
        <p>Logout</p>
      </div>
    </aside>
  ) : null;
};

export default SideBar;
