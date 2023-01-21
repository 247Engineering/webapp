import React, { useState } from "react";

import dropdown from "../../assets/images/arrow-down4.svg";
import checkbox from "../../assets/images/checkbox.svg";
import checkboxAlt from "../../assets/images/checkbox-alt.svg";
import checkboxBlank from "../../assets/images/checkbox-blank.svg";
import { MultiSelectCheckboxProps } from "../../types";

const MultiSelectCheckbox = ({
  className,
  items,
  type,
  onChange,
  isMultiSelect = true,
  selected,
}: MultiSelectCheckboxProps) => {
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(
    isMultiSelect ? items.map((item) => item._id) : [selected]
  );
  const allItemsSelected = selectedItems.length === items.length;
  const selectedItem = items.find((item) => item._id === selectedItems[0]);

  return (
    <div
      className={`flex flex-col items-center relative ${
        className ? className : ""
      }`}
    >
      <button
        className="flex justify-center items-center rounded-[10px] p-2 font-[700] text-[0.75rem] leading-[1rem] capitalize"
        onClick={() => setShow(!show)}
      >
        {selectedItems.length > 1
          ? `${allItemsSelected ? "All " : ""}${selectedItems.length} ${type}`
          : selectedItem?.name || "None"}
        <img src={dropdown} alt="dropdown" className="ml-3" />
      </button>
      <div
        className={`z-10 rounded-tl-[12px] rounded-tr-[12px] bg-white pt-2 w-full shadow-sm absolute ease-in-out transition-all duration-300 ${
          show ? "translate-y-[3rem]" : "translate-y-[-50rem]"
        }`}
      >
        <ul className="capitalize mb-[3.75rem]">
          {isMultiSelect ? (
            <li
              className="flex items-center py-[0.625rem] px-[1.156rem] border border-solid border-grey-light-100 border-0 border-b"
              onClick={() =>
                allItemsSelected
                  ? setSelectedItems([])
                  : setSelectedItems(items.map((item) => item._id))
              }
            >
              <img
                src={allItemsSelected ? checkbox : checkboxAlt}
                alt="checkbox"
                className="w-[0.938rem] h-[0.938rem] mr-[0.656rem]"
              />
              <span className="text-[0.875rem] leading-[1.25rem]">
                All {type} ({items.length})
              </span>
            </li>
          ) : null}
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center py-[0.625rem] px-[1.156rem]"
              onClick={() =>
                isMultiSelect
                  ? setSelectedItems((prevItems) =>
                      selectedItems.includes(item._id)
                        ? prevItems.filter((prevItem) => prevItem !== item._id)
                        : [...prevItems, item._id]
                    )
                  : setSelectedItems([item._id])
              }
            >
              <img
                src={
                  selectedItems.includes(item._id) ? checkbox : checkboxBlank
                }
                alt="checkbox"
                className="w-[0.938rem] h-[0.938rem] mr-[0.656rem]"
              />
              <span className="text-[0.875rem] leading-[1.25rem]">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
        <div className="p-4 font-[700] text-[0.875rem] leading-[1.25rem]">
          <button
            className="flex justify-center items-center p-[0.875rem] bg-orange text-white rounded-[12px] mb-4 w-full"
            onClick={() => {
              onChange(isMultiSelect ? selectedItems : selectedItems[0]);
              setShow(false);
            }}
            disabled={!selectedItems.length}
          >
            Select {isMultiSelect ? type : type.slice(0, -1)}
          </button>
          <button
            className="flex justify-center items-center p-[0.875rem] text-purple rounded-[12px] w-full"
            onClick={() => setShow(false)}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectCheckbox;
