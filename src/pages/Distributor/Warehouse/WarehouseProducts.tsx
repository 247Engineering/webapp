import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import add from "../../../assets/images/add.svg";
import search from "../../../assets/images/search.svg";
import image from "../../../assets/images/image.svg";

import SortSelect from "../../../components/forms/SortSelect";
import AppLayout from "../../../components/layouts/AppLayout";
import TableLayout from "../../../components/tables/TableLayout";
import TableFooter from "../../../components/tables/TableFooter";
import MultiSelectCheckbox from "../../../components/forms/MultiSelectCheckbox";

import {
  fetchProducts,
  toggleDisableProducts,
  deleteProducts,
} from "../../../store/features/product";
import { fetchWarehouses } from "../../../store/features/distributor";
import { AppDispatch, RootState } from "../../../store";
import { DistributorState, ProductState } from "../../../types";
import * as ROUTES from "../../../routes";

const WarehouseProducts = () => {
  const navigate = useNavigate();
  const { warehouse } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector<RootState>(
    ({ product }) => product
  ) as ProductState;
  const { warehouses } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [sort, setSort] = useState("");
  const [action, setAction] = useState("EDIT");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const applyChange = () => {
    switch (action) {
      case "ENABLE":
      case "DISABLE":
        dispatch(
          toggleDisableProducts({
            onSuccess: () => dispatch(fetchProducts(warehouse)),
            warehouse: warehouse as string,
            change_status: action,
            product_ids: checkedItems,
          })
        );
        break;
      case "DELETE":
        dispatch(
          deleteProducts({
            onSuccess: () => dispatch(fetchProducts(warehouse)),
            products: checkedItems,
          })
        );
        break;
      default:
        console.log("WIP");
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchProducts(warehouse));
    dispatch(fetchWarehouses());
  }, [dispatch, warehouse]);

  return (
    <div className="h-full" onClick={() => setOpen(false)}>
      <AppLayout>
        <MultiSelectCheckbox
          items={warehouses || []}
          type="warehouses"
          isMultiSelect={false}
          className="mb-4"
          onChange={(warehouse) => {
            navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCTS_FOR(warehouse));
          }}
          selected={warehouse}
        />
        <header className="flex justify-between items-center">
          <h1 className="h1 text-black">Products</h1>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="button-add rounded-[10px] bg-orange text-white w-[2rem] h-[2rem]"
              onClick={() => setOpen(true)}
            >
              <img src={add} alt="add" className="w-[0.729rem] h-[0.729rem]" />
            </button>
            {open ? (
              <ul className="rounded-[8px] shadow-sm py-2 w-[11.125rem] absolute right-0 z-10 bg-white">
                <li
                  className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p"
                  onClick={() =>
                    navigate(
                      ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCT_FORM_FOR(
                        warehouse as string
                      )
                    )
                  }
                >
                  Add new product
                </li>
                <li className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p">
                  Upload excel or CSV
                </li>
              </ul>
            ) : null}
          </div>
        </header>
        <section className="mt-6 text-black">
          <div className="flex items-center mb-8">
            <SortSelect
              options={[
                "Value - highest to lowest",
                "Value - lowest to highest",
              ]}
              value={sort}
              onChange={(value) => setSort(value)}
            />
            <button
              className="d-flex justify-center items-center rounded-full bg-grey h-[2rem] w-[2rem] ml-2"
              onClick={() => {}}
            >
              <img
                src={search}
                alt="search"
                className="w-[1.25rem] h-[1.25rem] ml-[6px]"
              />
            </button>
          </div>
          <div className="flex items-center mb-2">
            <select
              className="select product-select mr-2"
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="EDIT">Bulk edit</option>
              <option value="DELETE">Delete</option>
              <option value="DISABLE">Disable</option>
              <option value="ENABLE">Enable</option>
            </select>
            <button
              className="flex justify-center items-center bg-orange text-white rounded-[10px] px-4 py-2 font-[700] text-[0.75rem] leading-[1rem]"
              onClick={applyChange}
              disabled={loading}
            >
              Apply
            </button>
          </div>
          <TableLayout>
            <thead>
              <tr>
                <th className="w-[2.25rem] checkbox">
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      checked={checkedItems.length === products.length}
                      onChange={() => {
                        setCheckedItems(
                          checkedItems.length === products.length
                            ? []
                            : products.map((p) => p._id)
                        );
                      }}
                      className="h-[0.938rem] w-[0.938rem]"
                    />
                  </div>
                </th>
                <th className="w-[11.938rem]">Products</th>
                <th className="w-[11.188rem]">SKU</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.sku} className="text-[0.75rem] leading-[1rem]">
                  <td className="w-[2.25rem]">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(product._id)}
                        onChange={() => {
                          setCheckedItems((prevItems) =>
                            prevItems.includes(product._id)
                              ? prevItems.filter(
                                  (prevItem) => prevItem !== product._id
                                )
                              : [...prevItems, product._id]
                          );
                        }}
                        className="h-[0.938rem] w-[0.938rem]"
                      />
                    </div>
                  </td>
                  <td
                    className="w-[11.938rem] px-4 py-2"
                    onClick={() => {
                      navigate(
                        ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCT_EDIT_FOR(
                          warehouse as string,
                          product._id
                        )
                      );
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        src={product.images[0] || image}
                        className="w-[2rem] h-[2rem] rounded-[4px] mr-2"
                        alt="product item"
                      />
                      <p className="font-[700] text-purple capitalize">
                        {product.name}
                      </p>
                    </div>
                  </td>
                  <td className="w-[11.188rem] p-4">{product.sku}</td>
                </tr>
              ))}
            </tbody>
          </TableLayout>
          <div className="pl-[2.25rem]">
            <TableFooter />
          </div>
        </section>
      </AppLayout>
    </div>
  );
};

export default WarehouseProducts;
