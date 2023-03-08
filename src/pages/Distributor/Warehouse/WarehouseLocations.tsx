import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import add from "../../../assets/images/add.svg";
import search from "../../../assets/images/search.svg";
import dots from "../../../assets/images/three-dots.svg";
import distributor from "../../../assets/images/distributor-checked.svg";

import AppLayout from "../../../components/layouts/AppLayout";
import SortSelect from "../../../components/forms/SortSelect";
import TableLayout from "../../../components/tables/TableLayout";

import { fetchWarehouses } from "../../../store/features/distributor";
import { AppDispatch, RootState } from "../../../store";
import { DistributorState, AuthContextType } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";
import * as ROUTES from "../../../routes";

const WarehouseLocations = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { warehouses } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const { user } = useAuth() as AuthContextType;

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  return (
    <div className="h-full" onClick={() => setOpen(false)}>
      <AppLayout>
        <header className="flex justify-between">
          <div>
            <h1 className="h1 mb-2 text-black">Warehouses</h1>
            <p className="p text-black-100">
              View and manage all your warehouses
            </p>
          </div>
          {user.type === "distributor" ? (
            <button
              className="button-add rounded-[12px] bg-orange text-white w-[3rem] h-[3rem]"
              onClick={() => navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_FORM)}
            >
              <img src={add} alt="add" className="w-[0.75rem] h-[0.75rem]" />
            </button>
          ) : null}
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
          <div className="mb-10">
            <h5 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
              Open ({warehouses?.filter((w) => w.created).length})
            </h5>
            <TableLayout>
              <tbody>
                {warehouses?.map(
                  (warehouse, i) =>
                    warehouse.created && (
                      <tr
                        key={i}
                        onClick={() => {
                          navigate(
                            user.type === "warehouse"
                              ? ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCTS_FOR(
                                  warehouse._id
                                )
                              : ROUTES.DISTRIBUTOR.WAREHOUSE_DETAILS_FOR(
                                  warehouse._id
                                )
                          );
                        }}
                      >
                        <td className="w-[15rem] p-2 pl-4 text-[0.75rem] leading-[1rem] overflow-hidden text-ellipsis whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={distributor}
                              alt="warehouse icon"
                              className="h-[2rem] w-[2rem] mr-2"
                            />
                            <div className="flex flex-col justify-between capitalize">
                              <h6 className="hover:text-purple font-[700]">
                                {warehouse.name}
                              </h6>
                              <p className="max-w-[10rem] overflow-hidden text-ellipsis">
                                {warehouse.formatted_address || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>
                        {/* <td className="w-[14.375rem] p-2 text-[0.75rem] leading-[1rem]">
                          <div>
                            <p className="font-[700]">Open</p>
                            <p>Closes 22:00 Mon-Sat</p>
                          </div>
                        </td> */}
                        <td className="w-[14.375rem] p-2 text-[0.75rem] leading-[1rem]">
                          <div>
                            <p className="font-[700]">
                              N{warehouse.sales?.toLocaleString() || "/A"}
                            </p>
                            <p>Sales</p>
                          </div>
                        </td>
                        <td className="w-10 p-2">
                          <div
                            className="flex items-center justify-center relative"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <img
                              src={dots}
                              alt="options"
                              className="w-1.5 h-5"
                              onClick={() => {
                                setOpen(!open);
                                setSelected(warehouse._id);
                              }}
                            />
                            {open && warehouse._id === selected ? (
                              <ul className="rounded-[8px] shadow-sm py-2 w-[11.125rem] absolute top-[-5px] right-[23px] z-10 bg-white">
                                {user.type === "distributor" ? (
                                  <>
                                    <li
                                      className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p"
                                      onClick={() => {
                                        navigate(
                                          ROUTES.DISTRIBUTOR.WAREHOUSE_DETAILS_FOR(
                                            warehouse._id
                                          )
                                        );
                                      }}
                                    >
                                      View
                                    </li>
                                    <li className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p">
                                      Delete
                                    </li>
                                  </>
                                ) : (
                                  <>
                                    <li
                                      className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p"
                                      onClick={() => {
                                        navigate(
                                          ROUTES.DISTRIBUTOR.WAREHOUSE_ORDERS
                                        );
                                      }}
                                    >
                                      View Orders
                                    </li>
                                    <li
                                      className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p"
                                      onClick={() => {
                                        navigate(
                                          ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCTS_FOR(
                                            warehouse._id
                                          )
                                        );
                                      }}
                                    >
                                      View Products
                                    </li>
                                  </>
                                )}
                              </ul>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </TableLayout>
          </div>
          <div>
            <h5 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
              Closed ({warehouses?.filter((w) => !w.created).length})
            </h5>
            <TableLayout>
              <tbody>
                {warehouses?.map(
                  (warehouse, i) =>
                    !warehouse.created && (
                      <tr key={i}>
                        <td className="w-[15rem] p-2 pl-4 text-[0.75rem] leading-[1rem]">
                          <div className="flex items-center">
                            <img
                              src={distributor}
                              alt="warehouse icon"
                              className="h-[2rem] w-[2rem] mr-2"
                            />
                            <div className="flex flex-col justify-between capitalize">
                              <h6 className="hover:text-purple font-[700]">
                                {warehouse.name}
                              </h6>
                              <p className="max-w-[10rem] overflow-hidden text-ellipsis">
                                {warehouse.formatted_address || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>
                        {/* <td className="w-[14.375rem] p-2 text-[0.75rem] leading-[1rem]">
                          <div>
                            <p className="font-[700]">Open</p>
                            <p>Closes 22:00 Mon-Sat</p>
                          </div>
                        </td> */}
                        <td className="w-[14.375rem] p-2 text-[0.75rem] leading-[1rem]">
                          <div>
                            <p className="font-[700]">
                              N{warehouse.sales?.toLocaleString() || "/A"}
                            </p>
                            <p>Sales</p>
                          </div>
                        </td>
                        {user.type === "distributor" ? (
                          <td className="w-10 p-2">
                            <div
                              className="flex items-center justify-center relative"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img
                                src={dots}
                                alt="options"
                                className="w-1.5 h-5"
                                onClick={() => {
                                  setOpen(!open);
                                  setSelected(warehouse._id);
                                }}
                              />
                              {open && warehouse._id === selected ? (
                                <ul className="rounded-[8px] shadow-sm py-2 w-[11.125rem] absolute top-[-5px] right-[23px] z-10 bg-white">
                                  {/* <li
                                    className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p"
                                    onClick={() => {
                                      navigate(
                                        ROUTES.DISTRIBUTOR.WAREHOUSE_DETAILS_FOR(
                                          warehouse._id
                                        )
                                      );
                                    }}
                                  >
                                    View
                                  </li> */}
                                  <li className="px-[0.75rem] py-[0.625rem] hover:bg-orange-light p">
                                    Delete
                                  </li>
                                </ul>
                              ) : null}
                            </div>
                          </td>
                        ) : null}
                      </tr>
                    )
                )}
              </tbody>
            </TableLayout>
          </div>
        </section>
      </AppLayout>
    </div>
  );
};

export default WarehouseLocations;
