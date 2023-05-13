import React, { useState } from "react";

import NavBar from "../navigation/NavBar";
import SideBar from "../navigation/SideBar";
import BottomNav from "../navigation/BottomNav";

import { AppLayoutProps } from "../../types";

const AppLayout = ({
  children,
  noPadding,
  bottomNav,
  ...props
}: AppLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`h-full text-black relative flex flex-col ${
        showSidebar ? "max-h-[100vh] overflow-hidden" : ""
      }`}
    >
      <SideBar show={showSidebar} />
      <NavBar
        {...props}
        setShowSideBar={setShowSidebar}
        showSideBar={showSidebar}
      />
      {bottomNav ? <BottomNav /> : null}
      <main
        className={`h-full ${noPadding ? "" : "pt-8 pb-12 px-4"}`}
        onClick={() => setShowSidebar(false)}
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
