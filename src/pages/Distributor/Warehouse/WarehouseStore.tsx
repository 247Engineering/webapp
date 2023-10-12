import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import searchIcon from "../../../assets/images/input-search.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import ProductItem from "../../../components/miscellaneous/ProductItem";
import Loader from "../../../components/miscellaneous/Loader";

import { AppDispatch, RootState } from "../../../store";
import { DistributorState, ProductState } from "../../../types";
import { searchProducts, fetchProducts } from "../../../store/features/product";
import { fetchCart, reorderItems } from "../../../store/features/distributor";
import * as ROUTES from "../../../routes";

const WarehouseStore = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { warehouse } = useParams();

  const { products, loading } = useSelector<RootState>(
    ({ product }) => product
  ) as ProductState;

  const { warehouses, previousOrder, previousOrderId } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [search, setSearch] = useState("");

  const selectedWarehouse = useMemo(
    () => warehouses?.find((w) => w._id === warehouse),
    [warehouses, warehouse]
  );

  const repeatOrder = () => {
    dispatch(
      reorderItems({
        order_doc_id: previousOrderId as string,
        onSuccess: () =>
          navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_CART_FOR(warehouse as string)),
      })
    );
  };

  const debounceTimer = useRef<any>(null);

  useEffect(() => {
    if (search) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        dispatch(searchProducts(search));
      }, 500);
    } else {
      dispatch(fetchProducts(warehouse as string));
    }
  }, [dispatch, search, warehouse]);

  useEffect(() => {
    dispatch(fetchCart(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart(true));
  }, [dispatch]);

  return (
    <>
      <AppLayout
        location={selectedWarehouse?.name || "Victoria Island"}
        cart
        search
        hideLogo
      >
        {loading ? <Loader /> : null}
        <div
          className={`relative mt-[-1.5rem] ${
            previousOrder?.length ? "mb-1" : "mb-10"
          }`}
        >
          <input
            className="w-full p-[0.625rem] pl-[2.25rem] flex items-center justify-center p text-black-100 rounded-[8px] border border-solid border-grey-light"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search"
            className="w-[0.911rem] h-[0.911rem] absolute top-[15px] left-[11.5px]"
          />
        </div>
        {previousOrder?.length ? (
          <button
            className="button bg-orange text-white mb-4 mt-4"
            onClick={repeatOrder}
          >
            Repeat Last Order
          </button>
        ) : null}
        <section className="mr-[-1rem]">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.images[0]}
              name={product.name}
              minOrder={product.min_quantity || 10}
              price={product.price}
              discount={
                product.discount_price
                  ? Math.round(
                      ((product.price - product.discount_price) /
                        product.price) *
                        100
                    )
                  : undefined
              }
              discountPrice={product.discount_price}
              discountQuantity={product.discount_qty}
            />
          ))}
        </section>
      </AppLayout>
    </>
  );
};

export default WarehouseStore;
