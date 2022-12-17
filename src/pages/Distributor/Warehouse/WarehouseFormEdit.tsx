import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import AppLayout from "../../../components/layouts/AppLayout";
import Input from "../../../components/forms/Input";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";
import LocationInput from "../../../components/forms/LocationInput";

import { DistributorState, Address } from "../../../types";
import { AppDispatch, RootState } from "../../../store";
import {
  editWarehouse,
  resetWarehouseStamp,
} from "../../../store/features/distributor";
import * as ROUTES from "../../../routes";

const WarehouseFormEdit = () => {
  const navigate = useNavigate();
  const { warehouse: warehouseId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, warehouseStamp } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  // const [name, setName] = useState(warehouse?.warehouse.name || "");
  // const [location, setLocation] = useState<Address | null>(
  //   warehouse?.warehouse.location || null
  // );
  const [name, setName] = useState("");
  const [location, setLocation] = useState<Address | null>(null);
  const [locationDropdown, setLocationDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editWarehouse({
        ...(name && { name }),
        ...(location && { location }),
        warehouse: warehouseId as string,
      })
    );
  };

  const canSubmit = useMemo(
    () => [name, location].some((data) => !!data),
    [name, location]
  );

  useEffect(() => {
    // dispatch(fetchWarehouse(warehouseId as string));
    if (warehouseStamp) {
      navigate(ROUTES.DISTRIBUTOR.WAREHOUSES);
      toast.success("warehouse details have been updated");
    }
    return () => {
      dispatch(resetWarehouseStamp());
    };
  }, [dispatch, navigate, warehouseStamp]);

  return (
    <div onClick={() => setLocationDropdown(false)} className="h-full">
      <AppLayout alternate onClose={() => navigate(-1)}>
        <header>
          <h1 className="font-[700] leading-[1.75rem] text-[1.25rem] mb-2 text-black">
            Edit warehouse details
          </h1>
          <p className="p text-black-100">
            Update details about <span className="font-[700]">Femadons VI</span>
          </p>
        </header>
        <section className="mt-8 h-full flex flex-col text-black">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Warehouse name"
                value={name}
                onChange={setName}
                type="text"
              />
            </div>
            <div className="mb-4">
              <LocationInput
                label="Warehouse location"
                setLocation={setLocation}
                dropdown={locationDropdown}
                setDropdown={setLocationDropdown}
              />
            </div>
            <ButtonSubmit
              text="Submit"
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              loading={loading}
              className="mt-[80%]"
            />
          </form>
        </section>
      </AppLayout>
    </div>
  );
};

export default WarehouseFormEdit;
