import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import defaultImage from "../../assets/images/image.svg";

import Status from "./Status";
import OrderCounter from "./OrderCounter";

import {
  AuthState,
  DistributorState,
  ProductItemProps,
  RetailerState,
} from "../../types";
import * as ROUTES from "../../routes";
import { RootState } from "../../store";

const ProductItem = ({
  discount,
  image,
  name,
  price,
  minOrder,
  unit = "unit",
  id,
  discountQuantity,
  discountPrice,
}: ProductItemProps) => {
  const navigate = useNavigate();

  const { warehouse } = useParams();

  const { type } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const { cartItems: retailerCartItems } = useSelector<RootState>(
    ({ retailer }) => retailer
  ) as RetailerState;

  const { cartItems: distributorCartItems } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const cartItems =
    type === "retailer" ? retailerCartItems : distributorCartItems;
  const itemInCart = cartItems?.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(itemInCart?.quantity || 0);

  return (
    <div
      className="py-4 w-full min-h-[10.625rem] border border-solid border-grey-light border-0 border-b flex mb-2"
      onClick={() =>
        navigate(
          type === "retailer"
            ? ROUTES.RETAILER.STORE_PRODUCT_FOR(id)
            : ROUTES.DISTRIBUTOR.WAREHOUSE_STORE_PRODUCT_FOR(
                warehouse as string,
                id
              )
        )
      }
    >
      {/* <div className="w-[29%] py-4 px-3 h-fit rounded-[4px]"> */}
      <img
        src={image || defaultImage}
        className="w-[6.25rem] h-[5.938rem] rounded-[4px]"
        alt="product"
        onError={(e) => {
          //@ts-ignore
          e.target.src = defaultImage;
        }}
      />
      {/* </div> */}
      <div className="w-full flex flex-col pl-4">
        {discountPrice && discountQuantity ? (
          <div className="mb-1">
            <Status
              className="bg-green-light text-green rounded-[6px] px-[0.375rem] py-[0.125rem] w-auto"
              text={`Save ${discount}%`}
            />
          </div>
        ) : null}
        <p className="max-w-[13.75rem] font-[700] text-[0.75rem] leading-[1rem] mb-1 capitalize">
          {name}
        </p>
        <p className="flex items-center text-[1rem] leading-[1.5rem]">
          N{price}
          <span className="capitalize text-[0.625rem] leading-[0.875rem] text-black-100 ml-1">
            (Per {unit})
          </span>
        </p>
        <p
          className={`text-[0.625rem] leading-[0.875rem] text-black-100 capitalize ${
            discountQuantity ? "" : "mb-2"
          }`}
        >
          Min Order ({minOrder} {unit}
          {minOrder > 1 ? "s" : ""})
        </p>
        {discountPrice && discountQuantity ? (
          <p className="text-[0.625rem] leading-[0.875rem] text-black-100 capitalize mb-2">
            Discount Order ({discountQuantity} {unit}
            {discountQuantity > 1 ? "s" : ""})
          </p>
        ) : null}
        <OrderCounter
          minOrder={minOrder}
          className="mt-auto"
          id={id}
          name={name}
          price={price}
          discountPrice={discountPrice}
          discountQuantity={discountQuantity}
          image={image}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
    </div>
  );
};

export default ProductItem;
