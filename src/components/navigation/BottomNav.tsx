import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import menu from "../../assets/images/menu.svg";
import menuSelected from "../../assets/images/menu-selected.svg";
import wallet from "../../assets/images/wallet.svg";
import walletSelected from "../../assets/images/wallet-selected.svg";
import deliveries from "../../assets/images/box.svg";
import deliveriesSelected from "../../assets/images/deliveries-selected.svg";
import profile from "../../assets/images/profile.svg";

import * as ROUTES from "../../routes";

const BottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-8 py-[1.125rem] border border-solid border-grey-light-100 border-0 border-t fixed bottom-0 left-0 right-0 z-10">
      <img
        src={pathname === ROUTES.LOGISTICS.DASHBOARD ? menuSelected : menu}
        alt="menu"
        onClick={() => navigate(ROUTES.LOGISTICS.DASHBOARD)}
      />
      <img
        src={
          pathname === ROUTES.LOGISTICS.DELIVERIES
            ? deliveriesSelected
            : deliveries
        }
        alt="deliveries"
        onClick={() => navigate(ROUTES.LOGISTICS.DELIVERIES)}
      />
      <img
        src={pathname === ROUTES.LOGISTICS.WALLET ? walletSelected : wallet}
        alt="wallet"
        onClick={() => navigate(ROUTES.LOGISTICS.WALLET)}
      />
      <img src={profile} alt="profile" />
    </div>
  );
};

export default BottomNav;
