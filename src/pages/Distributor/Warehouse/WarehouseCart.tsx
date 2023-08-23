import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import image from "../../../assets/images/image.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";
import CartItem from "../../../components/miscellaneous/CartItem";

import { RootState } from "../../../store";
import { DistributorState } from "../../../types";
import * as ROUTES from "../../../routes";

const WarehouseCart = () => {
  const navigate = useNavigate();

  const { warehouse } = useParams();

  const { cartItems } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  return (
    <>
      <AppLayout
        cart
        // hideLogo
        // hideName
        secondaryNav="Cart"
        secondaryNavBack="Store"
        back={ROUTES.DISTRIBUTOR.WAREHOUSE_STORE_FOR(warehouse as string)}
      >
        <section className="pb-32">
          {cartItems?.map((item) => (
            <CartItem
              id={item.id}
              key={item.id}
              image={item.image || image}
              name={item.name}
              price={item.price}
              minOrder={10}
            />
          ))}
          <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[1rem] leading-[1.5rem]">Subtotal</span>
              <span className="font-[700] text-[1.25rem] leading-[1.75rem]">
                N{" "}
                {cartItems
                  ?.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
                  .toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </span>
            </div>
            <ButtonSubmit
              text="Continue to checkout"
              onClick={() =>
                navigate(
                  ROUTES.DISTRIBUTOR.WAREHOUSE_CHECKOUT_FOR(warehouse as string)
                )
              }
              className="text-white bg-orange"
              disabled={!Boolean(cartItems?.length)}
            />
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default WarehouseCart;
