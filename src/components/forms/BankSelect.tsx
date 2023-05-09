import React, { useState } from "react";

import add from "../../assets/images/add-sm.svg";
import caret from "../../assets/images/arrow-down.svg";

import { BankSelectProps } from "../../types";

const BankSelect = ({
  label,
  options,
  onChange,
  dropdown,
  setDropdown,
  loading,
  addBank,
}: BankSelectProps) => {

  const [text, setText] = useState("");

  const handleChange = (option: any) => {
    setText(`${option.bankName} - ${option.accountName}`);
    setDropdown(false);
    onChange(option);
  };

  return (
    <>
      <label className="label text-black">{label}</label>
      <div className="relative text-black" onClick={(e) => e.stopPropagation()}>
        <div className="relative" onClick={() => setDropdown(!dropdown)}>
          <div className="input mt-2 capitalize min-h-[3rem]">{text}</div>
          <img
            src={caret}
            alt="caret"
            className="absolute top-[42%] right-[13px]"
          />
        </div>
        {dropdown ? (
          <ul className="rounded-[8px] shadow-sm py-2 max-h-[13.5rem] overflow-y-auto text-ellipsis absolute bg-white z-10 w-full">
            <li
              className="px-[0.75rem] py-[0.625rem] flex items-center hover:bg-orange-light focus:bg-orange-light p"
              onClick={addBank}
            >
              <img
                src={add}
                className="rounded-full w-[1.016rem] h-[1.016rem] mr-[0.7rem]"
                alt="product"
              />
              Add bank account
            </li>
            {options?.map((option, i) => (
              <li
                key={i}
                className="px-[0.75rem] py-[0.625rem] flex items-center hover:bg-orange-light focus:bg-orange-light p"
                onClick={() => handleChange(option)}
              >
                <img
                  src={option.image}
                  className="rounded-full w-[1.25rem] h-[1.25rem] mr-2"
                  alt="bank"
                />
                <div>
                  <p>{option.accountName}</p>
                  <p>
                    {option.bankName} - {option.accountNumber}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default BankSelect;
