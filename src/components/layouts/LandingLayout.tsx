import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/24Seven.svg";

import * as ROUTES from "../../routes";

const LandingLayout = ({ children }: any) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-10 pb-3.5 h-full flex flex-col">
      <img
        className="mb-5 w-[7.813rem] h-[2rem]"
        src={logo}
        alt="logo"
        onClick={() => navigate(ROUTES.AUTH.ACCOUNT_SELECT)}
      />
      {children}
    </div>
  );
};

export default LandingLayout;
