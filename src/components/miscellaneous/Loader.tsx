import React, { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const Loader = () => {
  const override: CSSProperties = {
    borderColor: "#E34B31",
    background: "transparent",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <MoonLoader cssOverride={override} size={30} color="#E34B31" />
    </div>
  );
};

export default Loader;
