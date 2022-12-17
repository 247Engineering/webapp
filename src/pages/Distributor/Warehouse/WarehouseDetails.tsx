import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import edit from "../../../assets/images/edit.svg";
import image from "../../../assets/images/image.svg";
import dots from "../../../assets/images/three-dots-white.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import TableLayout from "../../../components/tables/TableLayout";
import TableFooter from "../../../components/tables/TableFooter";
import BackButton from "../../../components/forms/BackButton";

import { fetchWarehouse } from "../../../store/features/distributor";
import { fetchWarehouseProducts } from "../../../store/features/product";
import { AppDispatch, RootState } from "../../../store";
import { DistributorState, ProductState } from "../../../types";
import * as ROUTES from "../../../routes";

const WarehouseDetails = () => {
  const navigate = useNavigate();
  const { warehouse: warehouseId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { warehouse } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;
  const { products } = useSelector<RootState>(
    ({ product }) => product
  ) as ProductState;

  const [type, setType] = useState("details");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWarehouse(warehouseId as string));
    dispatch(fetchWarehouseProducts(warehouseId as string));
  }, [dispatch, warehouseId]);

  return (
    <div className="h-full" onClick={() => setOpen(false)}>
      <AppLayout>
        <header>
          <BackButton text="Warehouses" />
          <div className="flex justify-between mt-2 mb-7">
            <div>
              <h1 className="font-[700] text-[1.25rem] leading-[1.75rem] mb-2 text-black">
                Femadons Victoria Island
              </h1>
              <p className="p mb-2 text-black-100">10/10/2022 at 13:00PM</p>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setOpen(true)}
                className="bg-orange h-[2rem] w-[2rem] rounded-[10px] flex justify-center items-center relative"
              >
                <img src={dots} alt="open options" />
                {open ? (
                  <ul className="rounded-[8px] shadow-sm py-2 absolute top-[40px] right-0 z-10 bg-white w-max text-left">
                    <li className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p">
                      Delete
                    </li>
                    <li className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p">
                      Disable
                    </li>
                    <li className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p">
                      Enable
                    </li>
                  </ul>
                ) : null}
              </button>
            </div>
          </div>
        </header>
        <section>
          <div className="p-1 bg-grey-light-200 rounded-[10px] flex items-center justify-between font-[700] text-[0.875rem] leading-[1.25rem] mb-8">
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] py-[0.625rem] px-[0.875rem] w-[50%] ${
                type === "details" ? "text-orange bg-orange-light-100" : ""
              }`}
              onClick={() => setType("details")}
            >
              Warehouse details
            </button>
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] py-[0.625rem] px-[0.875rem] w-[50%] ${
                type === "inventory" ? "text-orange bg-orange-light-100" : ""
              }`}
              onClick={() => setType("inventory")}
            >
              Inventory
            </button>
          </div>
          {type === "details" ? (
            <>
              <div className="rounded-[12px] border border-solid border-grey-light p-4 relative mb-4">
                <h6 className="mb-2 font-[700] text-[0.75rem] leading-[1rem]">
                  Warehouse Manager
                </h6>
                <div className="font-[400] text-[0.875rem] leading-[1.25rem]">
                  <p className="capitalize">
                    {warehouse?.user.first_name} {warehouse?.user.last_name}
                  </p>
                  <p>{warehouse?.user.email}</p>
                </div>
                <img
                  className="absolute w-[1.25rem] h-[1.25rem] top-[1.25rem] right-[1.25rem]"
                  src={edit}
                  alt="edit"
                  onClick={() =>
                    navigate(
                      ROUTES.DISTRIBUTOR.WAREHOUSE_CHANGE_MANAGER_FOR(
                        warehouseId as string
                      )
                    )
                  }
                />
              </div>
              <div className="rounded-[12px] border border-solid border-grey-light p-4 relative mb-4">
                <div className="mb-4">
                  <h6 className="mb-2 font-[700] text-[0.75rem] leading-[1rem]">
                    Warehouse Name
                  </h6>
                  <p className="font-[400] text-[0.875rem] leading-[1.25rem] capitalize">
                    {warehouse?.warehouse.name}
                  </p>
                </div>
                <div>
                  <h6 className="mb-2 font-[700] text-[0.75rem] leading-[1rem]">
                    Warehouse Address
                  </h6>
                  <p className="font-[400] text-[0.875rem] leading-[1.25rem] max-w-[13.563rem] capitalize">
                    {warehouse?.warehouse.address}
                  </p>
                </div>
                <img
                  className="absolute w-[1.25rem] h-[1.25rem] top-[1.25rem] right-[1.25rem]"
                  src={edit}
                  alt="edit"
                  onClick={() =>
                    navigate(
                      ROUTES.DISTRIBUTOR.WAREHOUSE_EDIT_FOR(
                        warehouseId as string
                      )
                    )
                  }
                />
              </div>
            </>
          ) : (
            <>
              <TableLayout>
                <thead>
                  <tr>
                    <th className="w-[11.938rem]">Products</th>
                    <th className="w-[11.188rem]">SKU</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr
                      key={product.sku}
                      className="text-[0.75rem] leading-[1rem]"
                    >
                      <td className="w-[11.938rem] px-4 py-2">
                        <div className="flex items-center">
                          <img
                            src={product.images[0] || image}
                            className="w-[2rem] h-[2rem] rounded-[4px] mr-2"
                            alt="product item"
                          />
                          <p className="font-[700] text-purple capitalize truncate">
                            {product.name}
                          </p>
                        </div>
                      </td>
                      <td className="w-[11.188rem] p-4">{product.sku}</td>
                    </tr>
                  ))}
                </tbody>
              </TableLayout>
              <TableFooter />
            </>
          )}
        </section>
      </AppLayout>
    </div>
  );
};

export default WarehouseDetails;
