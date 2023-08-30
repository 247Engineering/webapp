import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import image from "../../../assets/images/image.svg";
import slideLeft from "../../../assets/images/slide-left.svg";
import slideRight from "../../../assets/images/slide-right.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import BackButton from "../../../components/forms/BackButton";
import Status from "../../../components/miscellaneous/Status";
import OrderCounter from "../../../components/miscellaneous/OrderCounter";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";

import { AppDispatch, RootState } from "../../../store";
import { ProductState, RetailerState } from "../../../types";
import {
  clearViewedProduct,
  fetchSingleWarehouseProduct,
} from "../../../store/features/product";
import { addToCart } from "../../../store/features/retailer";

const WarehouseStoreItem = () => {
  const { product } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { viewedProduct } = useSelector<RootState>(
    ({ product }) => product
  ) as ProductState;

  const { cartItems, loading } = useSelector<RootState>(
    ({ retailer }) => retailer
  ) as RetailerState;

  const itemInCart = cartItems.find((item) => item.id === product);

  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(itemInCart?.quantity || 0);

  useEffect(() => {
    dispatch(fetchSingleWarehouseProduct(product as string));
    return () => {
      dispatch(clearViewedProduct());
    };
  }, [dispatch, product]);

  return (
    <>
      <AppLayout
        cart
        // hideLogo hideName
      >
        <BackButton text="Back" className="ml-[-1rem]" />
        <section className="mt-8">
          <div className="h-[15.5rem] mb-7 relative">
            <img
              className="h-full w-full"
              src={viewedProduct?.images[imageIndex] || image}
              alt="product"
            />
            {viewedProduct?.images?.length > 1 ? (
              <>
                <img
                  className="absolute top-[45%] left-[1rem]"
                  src={slideLeft}
                  alt="slide left"
                  onClick={() =>
                    setImageIndex(
                      imageIndex === 0
                        ? (viewedProduct?.images.length || 1) - 1
                        : imageIndex - 1
                    )
                  }
                />
                <img
                  className="absolute top-[45%] right-[1rem]"
                  src={slideRight}
                  alt="slide right"
                  onClick={() =>
                    setImageIndex(
                      imageIndex === viewedProduct?.images.length - 1
                        ? 0
                        : imageIndex + 1
                    )
                  }
                />
              </>
            ) : null}
          </div>
          {viewedProduct?.discount_qty ? (
            <div className="mb-2">
              <Status
                className="bg-green-light text-green rounded-[10px] px-2 py-1"
                text={`Save ${
                  viewedProduct.discount_price
                    ? Math.round(
                        ((viewedProduct.price - viewedProduct.discount_price) /
                          viewedProduct.price) *
                          100
                      )
                    : undefined
                }%`}
              />
            </div>
          ) : null}
          <p className="font-[700] text-[1.25rem] leading-[1.75rem] mb-2 capitalize">
            {viewedProduct?.name}
          </p>
          <p className="flex items-center text-[1.25rem] leading-[1.75rem] mb-1">
            N{viewedProduct?.price.toLocaleString()}
            <span className="capitalize text-[0.75rem] leading-[1rem] text-black-100 ml-2">
              (Per unit)
            </span>
          </p>
          <p
            className={`text-[0.75rem] leading-[1rem] text-black-100 capitalize ${
              viewedProduct?.discount_qty ? "mb-1" : "mb-4"
            }`}
          >
            Min Order ({viewedProduct?.min_quantity} unit
            {viewedProduct?.min_quantity > 1 ? "s" : ""})
          </p>
          {viewedProduct?.discount_qty ? (
            <p className="text-[0.75rem] leading-[1rem] text-black-100 capitalize mb-4">
              Discount Order ({viewedProduct?.discount_qty} unit
              {viewedProduct?.discount_qty > 1 ? "s" : ""})
            </p>
          ) : null}
          <span className="mb-2 font-[700] text-[0.75rem] leading-[1rem]">
            Quantity
          </span>
          <OrderCounter
            minOrder={viewedProduct?.min_quantity || 10}
            className="mb-4 mt-2"
            id={product as string}
            name={viewedProduct?.name}
            price={viewedProduct?.price}
            image={viewedProduct?.images[0]}
            quantity={quantity}
            setQuantity={setQuantity}
            discountPrice={viewedProduct?.discount_price}
            discountQuantity={viewedProduct?.discount_qty}
          />
          <span className="font-[700] text-[0.75rem] leading-[1rem]">
            Description
          </span>
          <p className="mt-2 mb-[6.5rem] text-[0.875rem] leading-[1.25rem]">
            {viewedProduct?.description}
          </p>
          <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
            <ButtonSubmit
              disabled={loading}
              loading={loading}
              text="Add to cart"
              onClick={() =>
                dispatch(
                  addToCart({
                    cartItem: {
                      id: product as string,
                      quantity: quantity + 10,
                      price: viewedProduct?.price,
                      name: viewedProduct?.name,
                      image: viewedProduct?.images[0],
                      minOrder: viewedProduct?.min_quantity || 10,
                      discountPrice: viewedProduct?.discount_price,
                      discountQuantity: viewedProduct?.discount_qty,
                    },
                    onSuccess: () =>
                      setQuantity((quantity: number) => quantity + 10),
                  })
                )
              }
              className="text-white bg-orange"
            />
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default WarehouseStoreItem;
