import React from "react";
import logo from "../../assets/images/24Seven.svg";

const OnboardingLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col h-full pb-3.5">
      <div className="px-4 pt-10 bg-orange-light">
        <img className="mb-5 w-[7.813rem] h-[2rem]" src={logo} alt="logo" />
      </div>
      {children}
    </div>
  );
};

export default OnboardingLayout;
