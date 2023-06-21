import React, { useState, useReducer, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../../../components/layouts/AppLayout";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";
import Input from "../../../components/forms/Input";
import Checkbox from "../../../components/forms/Checkbox";
import BackButton from "../../../components/forms/BackButton";
import DragAndDrop from "../../../components/forms/DragAndDrop";
import WeightInput from "../../../components/forms/WeightInput";
import SearchSelect from "../../../components/forms/SearchSelect";

import { productImageReducer } from "../../../helpers/miscellaneous";
import { ProductState, WarehouseProductProps } from "../../../types";
import { AppDispatch, RootState } from "../../../store";
import {
  addProduct,
  clearSearchResult,
  fetchCategories,
  fetchManufacturers,
  // fetchSubCategories,
  reset,
  searchProducts,
  fetchSingleWarehouseProduct,
  editProduct,
} from "../../../store/features/product";
import * as ROUTES from "../../../routes";

const WarehouseProduct = ({
  isEdit,
  header,
  subHeader,
}: WarehouseProductProps) => {
  const navigate = useNavigate();
  const { warehouse, product: productId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector<RootState>(
    ({ product }) => product
  ) as ProductState;

  const {
    categories,
    // subCategories,
    manufacturers,
    searchResult,
    loading,
    productStamp,
    viewedProduct,
  } = product;

  const [dropdown, setDropdown] = useState(false);
  const [name, setName] = useState(viewedProduct?.name || "");
  const [description, setDescription] = useState(
    viewedProduct?.description || ""
  );
  const [price, setPrice] = useState(viewedProduct?.price || 0);
  const [discountedPrice, setDiscountedPrice] = useState(
    viewedProduct?.discount_price || 0
  );
  const [costPerItem, setCostPerItem] = useState(
    viewedProduct?.cost_per_item || 0
  );
  const [trackQuantity, setTrackQuantity] = useState(
    viewedProduct?.trackQuantity || false
  );
  const [quantity, setQuantity] = useState(viewedProduct?.quantity || 0);
  const [minQuantity, setMinQuantity] = useState(
    viewedProduct?.min_quantity || 10
  );
  const [weightValue, setWeightValue] = useState(
    viewedProduct?.weight?.value || 0
  );
  const [weightUnit, setWeightUnit] = useState(
    viewedProduct?.weight?.type ? String(viewedProduct?.weight?.type) : "0"
  );
  const [category, setCategory] = useState(viewedProduct?.category || "");
  // const [subCategory, setSubCategory] = useState(
  //   viewedProduct?.sub_category || ""
  // );
  const [manufacturer, setManufacturer] = useState(
    viewedProduct?.manufacturer || ""
  );

  const [images, dispatchImage] = useReducer(
    productImageReducer,
    viewedProduct?.images || []
  );

  const addProductImage = (image: any) => {
    dispatchImage({
      type: "add",
      payload: image,
    });
  };

  const handleNameSelect = (option: any) => {
    setName(option.value);
    if (option.suggestedOption) {
      setDescription(option.description);
      setPrice(option.price);
      setDiscountedPrice(option.discount_price);
      setCostPerItem(option.cost_per_item);
      setQuantity(option.quantity);
      setMinQuantity(option.min_quantity);
      setWeightValue(option?.weight?.value || 0);
      setWeightUnit(String(option?.weight?.type) || "0");
      setCategory(option.category);
      // setSubCategory(option.sub_category);
      setManufacturer(option.manufacturer);
      dispatchImage({
        type: "replace",
        payload: option.images,
      });
    }
    dispatch(clearSearchResult());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isEdit
      ? dispatch(
          editProduct({
            name,
            description,
            price,
            ...(discountedPrice && { discount_price: discountedPrice }),
            cost_per_item: costPerItem,
            ...(minQuantity && { min_quantity: +minQuantity }),
            quantity,
            weight: {
              type: +weightUnit,
              value: +weightValue,
            },
            category,
            // sub_category: subCategory,
            manufacturer: manufacturer,
            images,
            warehouse_id: warehouse as string,
            product: productId as string,
          })
        )
      : dispatch(
          addProduct({
            name,
            description,
            price,
            ...(discountedPrice && { discount_price: discountedPrice }),
            cost_per_item: costPerItem,
            sku: product.sku as string,
            min_quantity: +minQuantity,
            quantity,
            weight: {
              type: +weightUnit,
              value: +weightValue,
            },
            category,
            // sub_category: subCategory,
            manufacturer: manufacturer,
            images,
            warehouse_id: warehouse as string,
          })
        );
  };

  const canSubmit = useMemo(
    () =>
      [
        name,
        price,
        costPerItem,
        quantity,
        weightValue,
        category,
        manufacturer,
      ].every((data) => !!data),
    [name, price, costPerItem, quantity, weightValue, category, manufacturer]
  );
  console.log({name, price, costPerItem, quantity, weightValue, category, manufacturer, canSubmit})

  useEffect(() => {
    dispatch(fetchCategories());
    // dispatch(fetchSubCategories());
    dispatch(fetchManufacturers());
    if (productId) {
      dispatch(fetchSingleWarehouseProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productStamp)
      navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCTS_FOR(warehouse as string));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, productStamp, warehouse]);

  useEffect(() => {
    if (viewedProduct) {
      setName(viewedProduct.name);
      setDescription(viewedProduct.description);
      setPrice(viewedProduct.price);
      setDiscountedPrice(viewedProduct.discount_price || 0);
      setCostPerItem(viewedProduct.cost_per_item);
      setTrackQuantity(viewedProduct?.trackQuantity || true);
      setQuantity(viewedProduct.quantity);
      setMinQuantity(viewedProduct.min_quantity);
      setWeightValue(viewedProduct.weight?.value || 0);
      setWeightUnit(String(viewedProduct.weight?.type) || "0");
      setCategory(viewedProduct.category);
      // setSubCategory(viewedProduct.sub_category);
      setManufacturer(viewedProduct.manufacturer);
      dispatchImage({
        type: "replace",
        payload: viewedProduct.images,
      });
    }
  }, [viewedProduct]);

  return (
    <div className="h-full" onClick={() => setDropdown(false)}>
      <AppLayout>
        <header>
          <BackButton text="Products" />
          <h1 className="font-[700] text-[1.25rem] leading-[1.75rem] my-2 text-black">
            {header}
          </h1>
          <p className="p mb-2 text-black-100">{subHeader}</p>
        </header>
        <section className="mt-6 text-black">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <SearchSelect
                label="Product name"
                dropdown={dropdown}
                setDropdown={setDropdown}
                value={name}
                onChange={handleNameSelect}
                placeholder={name || "Search product name"}
                itemImage
                addNew
                options={searchResult.map((r) => ({
                  ...r,
                  label: r.name,
                  value: r.name,
                  image: r.images[0],
                  suggestedOption: true,
                }))}
                onSearch={(product) => dispatch(searchProducts(product))}
                onBlur={() => dispatch(clearSearchResult())}
                loading={loading}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Description"
                value={description}
                onChange={setDescription}
                type="textarea"
                placeholder="Placeholder text"
              />
            </div>
            <div className="mb-8">
              {images.length ? (
                <div className="grid grid-cols-3 gap-[0.875rem]">
                  {images.map((img: string) => (
                    <img
                      key={img}
                      src={img}
                      className="h-[6.25rem] rounded-[8px] border border-solid border-grey-light"
                      alt="product"
                    />
                  ))}
                  {images.length < 3 ? (
                    <DragAndDrop
                      small
                      setData={addProductImage}
                      className="h-[6.25rem] justify-center"
                    />
                  ) : null}
                </div>
              ) : (
                <DragAndDrop
                  label="Product image"
                  setData={addProductImage}
                  color="orange"
                />
              )}
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <Input
                  label="Price"
                  value={price}
                  onChange={setPrice}
                  type="number"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Input
                  label="Discounted price"
                  value={discountedPrice}
                  onChange={setDiscountedPrice}
                  type="text"
                  placeholder="Enter discounted price"
                />
              </div>
            </div>
            <div className="mb-8 grid grid-cols-3 gap-3">
              <div>
                <Input
                  label="Cost per item"
                  value={costPerItem}
                  onChange={setCostPerItem}
                  type="number"
                  prefix="N "
                />
              </div>
              <div>
                <Input
                  label="Margin"
                  value={
                    price
                      ? Math.round(((price - costPerItem) / price) * 100)
                      : 0
                  }
                  onChange={() => {}}
                  type="number"
                  suffix="%"
                  disabled
                />
              </div>
              <div>
                <Input
                  label="Profit"
                  value={price - costPerItem}
                  onChange={() => {}}
                  type="number"
                  prefix="N "
                  disabled
                />
              </div>
            </div>
            <div className="mb-4">
              <Input
                label="SKU"
                value={viewedProduct?.sku || product.sku}
                onChange={() => {}}
                type="text"
                disabled
              />
            </div>
            <div className="mb-4">
              <Checkbox
                className="py-[0.375rem]"
                id="trak-quantity"
                checked={trackQuantity}
                onChange={() => setTrackQuantity(!trackQuantity)}
                label="Track Quantity"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Quantity"
                value={quantity}
                onChange={setQuantity}
                type="number"
                placeholder="Enter quantity"
              />
            </div>
            <div className="mb-4">
              <Input
                label="Minimum order quantity"
                value={minQuantity}
                onChange={setMinQuantity}
                type="number"
                placeholder="Enter minimum order quantity"
              />
            </div>
            <div className="mb-4">
              <WeightInput
                value={weightValue}
                setValue={setWeightValue}
                unit={weightUnit}
                setUnit={setWeightUnit}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Product category"
                value={category}
                onChange={setCategory}
                options={categories.map((c) => ({
                  label: c.name,
                  value: c._id,
                }))}
                alternate
                default="Select product category"
              />
            </div>
            {/* <div className="mb-4">
              <Input
                label="Product sub-category"
                value={subCategory}
                onChange={setSubCategory}
                options={subCategories.map((s) => ({
                  label: s.name,
                  value: s._id,
                }))}
                alternate
                default="Select product sub-category"
              />
            </div> */}
            <div>
              <Input
                label="Manufacturer"
                value={manufacturer}
                onChange={setManufacturer}
                options={manufacturers.map((m) => ({
                  label: m.name,
                  value: m._id,
                }))}
                alternate
                default="Select manufacturer"
              />
            </div>
            <div className="pb-12">
              <ButtonSubmit
                className="mt-[5.813rem]"
                text="Submit"
                onClick={handleSubmit}
                disabled={!canSubmit || loading}
                loading={loading}
              />
              {isEdit ? (
                <ButtonSubmit
                  className="mt-4 bg-transparent text-[#E53451]"
                  text="Cancel"
                  onClick={() => navigate(-1)}
                  type="button"
                />
              ) : null}
            </div>
          </form>
        </section>
      </AppLayout>
    </div>
  );
};

export default WarehouseProduct;
