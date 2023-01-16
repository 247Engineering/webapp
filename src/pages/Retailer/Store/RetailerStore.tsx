import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import searchIcon from "../../../assets/images/input-search.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import ProductItem from "../../../components/miscellaneous/ProductItem";

import { AppDispatch, RootState } from "../../../store";
import { ProductState } from "../../../types";
import {
  fetchAllProducts,
  searchStoreProducts,
} from "../../../store/features/product";

const RetailerShop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector<RootState>(
    ({ product }) => product
  ) as ProductState;

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      dispatch(searchStoreProducts(search));
    } else {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, search]);

  return (
    <>
      <AppLayout location="Victoria Island" cart search hideLogo>
        <div className="relative mt-[-1.5rem] mb-10">
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
        <section className="mr-[-1rem]">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.images[0]}
              name={product.name}
              minOrder={10}
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
            />
          ))}
        </section>
      </AppLayout>
    </>
  );
};

export default RetailerShop;
