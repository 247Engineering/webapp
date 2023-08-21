import React, { useState, useEffect, useMemo, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";

// import priority from '../../../assets/images/priority.svg'
// import priorityChecked from '../../../assets/images/priority-checked.svg'
import standard from "../../../assets/images/standard.svg";
import standardChecked from "../../../assets/images/standard-checked.svg";
// import schedule from "../../../assets/images/schedule.svg";
// import retailerMarker from "../../../assets/images/retailer-marker.svg";
import warehouseMarker from "../../../assets/images/warehouse-marker.svg";
// import scheduleChecked from '../../../assets/images/schedule-checked.svg'

import AppLayout from "../../../components/layouts/AppLayout";
import ButtonSubmit from "../../../components/forms/ButtonSubmit";
import LocationInput from "../../../components/forms/LocationInput";
import Input from "../../../components/forms/Input";
import OnboardingRadio from "../../../components/forms/OnboardingRadio";
import Map from "../../../components/miscellaneous/Map";
import OrderSummary from "../../../components/miscellaneous/OrderSummary";

import {
  Address,
  DeliveryOptions,
  DistributorState,
  AuthState,
} from "../../../types";
import { AppDispatch, RootState } from "../../../store";
import {
  resetWarehouseStamp,
  placeOrder,
  applyCoupon,
} from "../../../store/features/distributor";
import * as ROUTES from "../../../routes";

// const deliveryOptionMap = {
//   priority: 1,
//   standard: 2,
//   schedule: 3,
// };

const WarehouseCheckout = () => {
  const override: CSSProperties = {
    borderColor: "#E34B31",
    background: "transparent",
  };

  const navigate = useNavigate();

  const { warehouse: warehouseId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const {
    cartItems,
    loading,
    orderId,
    warehouseStamp,
    warehouses,
    couponAmount,
    // location: retailerGeo,
    // deliveryFee,
    // serviceFee,
  } = useSelector<RootState>(
    ({ distributor }) => distributor
  ) as DistributorState;

  // let retailerGeo = {};
  let deliveryFee = 0;
  let serviceFee = 0;

  const warehouse = useMemo(
    () => warehouses?.find((w) => w._id === warehouseId),
    [warehouses, warehouseId]
  );

  const { formattedAddress } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;

  const [defaultAddress, setDefaultAddress] = useState(true);
  const [location, setLocation] = useState<Address | null>(null);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOptions>("standard");
  const [type, setType] = useState("pickup");
  const [coupon, setCoupon] = useState("");

  const handleChange = (value: DeliveryOptions) => {
    setDeliveryOption(value);
  };

  const handleSubmit = () => {
    dispatch(
      placeOrder({
        ...(location && { location }),
        delivery_instructions: instructions,
        delivery_options: type === "delivery" ? 1 : 2,
      })
    );
  };

  useEffect(() => {
    if (warehouseStamp)
      navigate(
        ROUTES.DISTRIBUTOR.WAREHOUSE_PAYMENT_FOR(
          warehouseId as string,
          orderId as string
        )
      );
    return () => {
      dispatch(resetWarehouseStamp());
    };
  }, [warehouseStamp, warehouseId, orderId, navigate, dispatch]);

  // useEffect(() => {
  //   dispatch(getDeliveryFee());
  // }, [dispatch]);

  return (
    <div onClick={() => setLocationDropdown(false)} className="h-full">
      <AppLayout
        cart
        // hideLogo
        // hideName
        secondaryNav="Checkout"
        secondaryNavBack="Cart"
        back={ROUTES.DISTRIBUTOR.WAREHOUSE_CART_FOR(warehouseId as string)}
      >
        <section>
          <div className="p-1 bg-grey-light-200 rounded-[10px] flex items-center justify-between font-[700] text-[0.875rem] leading-[1.25rem] mb-8">
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] p-[0.625rem] w-[50%] ${
                type === "delivery" ? "text-orange bg-orange-light-100" : ""
              }`}
              onClick={() => {
                toast.success("Delivery checkout option is coming soon!");
                // setType("delivery")
              }}
            >
              Delivery
            </button>
            <button
              className={`flex items-center justify-center text-black-100 rounded-[8px] p-[0.625rem] w-[50%] ${
                type === "pickup" ? "text-orange bg-orange-light-100" : ""
              }`}
              onClick={() => {
                if (type === "delivery" && deliveryOption === "priority")
                  setDeliveryOption("standard");
                setType("pickup");
              }}
            >
              Pick-up
            </button>
          </div>
          {type === "delivery" ? (
            <>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
                Address
              </h4>
              <div className="mb-4">
                {defaultAddress ? (
                  <>
                    <div className="mb-1">
                      <Input
                        label="Location"
                        value={formattedAddress}
                        onChange={() => {}}
                        disabled
                      />
                    </div>
                    <span
                      className="text-orange font-[700] text-[0.875rem] leading-[1.25rem]"
                      onClick={() => setDefaultAddress(false)}
                    >
                      Change default address
                    </span>
                  </>
                ) : (
                  <LocationInput
                    label="Location"
                    setLocation={setLocation}
                    dropdown={locationDropdown}
                    setDropdown={setLocationDropdown}
                  />
                )}
              </div>
              <div>
                <Input
                  label="Delivery instructions"
                  value={instructions}
                  onChange={setInstructions}
                  type="textarea"
                  placeholder="Add instructions"
                />
              </div>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem] mt-8 mb-6">
                Delivery options
              </h4>
              {/* <OnboardingRadio
                id="priority"
                name="delivery"
                value="priority"
                img={priority}
                imgChecked={priorityChecked}
                textPrimary="Priority - N5,000"
                textSecondary="Same day delivery - Directly to you"
                checked={deliveryOption === 'priority'}
                onChange={handleChange}
                className="mb-4"
              /> */}
              <OnboardingRadio
                id="standard"
                name="delivery"
                value="standard"
                img={standard}
                imgChecked={standardChecked}
                textPrimary="Standard"
                textSecondary="24-48 hour delivery"
                checked={deliveryOption === "standard"}
                onChange={handleChange}
                className="mb-4"
              />
              {/* <OnboardingRadio
                id="schedule"
                name="delivery"
                value="schedule"
                img={schedule}
                imgChecked={scheduleChecked}
                textPrimary="Schedule"
                textSecondary="Select a time"
                checked={deliveryOption === 'schedule'}
                onChange={handleChange}
                className="mb-8"
              /> */}
            </>
          ) : (
            <>
              <div className="rounded-[10px] w-full h-[7.5rem] mb-8 overflow-hidden">
                <Map
                  center={{
                    lat: warehouse?.location?.latitude || 9.0765,
                    lng: warehouse?.location?.longitude || 7.3986,
                  }}
                  lat={warehouse?.location?.latitude || 9.0765}
                  lng={warehouse?.location?.longitude || 7.3986}
                  markers={[
                    {
                      lat: warehouse?.location?.latitude || 9.0765,
                      lng: warehouse?.location?.longitude || 7.3986,
                      img: warehouseMarker,
                    },
                    // {
                    //   lat: retailerGeo?.latitude || 9.0765,
                    //   lng: retailerGeo?.longitude || 7.3986,
                    //   img: retailerMarker,
                    // },
                  ]}
                />
              </div>
              <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
                Pick-up locations
              </h4>
              <h5 className="font-[700] text-[0.875rem] leading[1.25rem] mb-1">
                {warehouse?.name}
              </h5>
              <p className="text-[0.875rem] leading[1.25rem] text-black-100 mb-8">
                {warehouse?.formatted_address}
              </p>
              {/* <h4 className="font-[700] text-[1rem] leading-[1.5rem] mb-6">
                Pick-up time
              </h4>
              <OnboardingRadio
                id="standard"
                name="delivery"
                value="standard"
                img={standardChecked}
                imgChecked={standardChecked}
                textPrimary="Standard"
                textSecondary="24-48 hour delivery"
                checked={deliveryOption === "standard"}
                onChange={handleChange}
                className="mb-4"
              />
              <OnboardingRadio
                id="schedule"
                name="delivery"
                value="schedule"
                img={schedule}
                imgChecked={schedule}
                textPrimary="Schedule"
                textSecondary="Select a time"
                checked={deliveryOption === "schedule"}
                onChange={handleChange}
                className="mb-8"
              /> */}
            </>
          )}
          <OrderSummary
            cartItems={cartItems || []}
            addItems
            className="pb-1"
            deliveryFee={type === "delivery" ? deliveryFee : 0}
            serviceFee={serviceFee}
            couponAmount={couponAmount}
          />
          <div className="grid grid-cols-2 gap-2 items-center pb-[10.75rem]">
            <input
              className="input"
              type="text"
              placeholder="Enter coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            />
            <button
              disabled={!coupon || loading || !!couponAmount}
              className="bg-orange text-white button button-small p-2 ml-auto !w-[7.469rem]"
              onClick={() =>
                dispatch(
                  applyCoupon({
                    warehouse_id: warehouseId as string,
                    coupon,
                    amount:
                      (cartItems || [])?.reduce(
                        (acc, curr) => acc + curr.quantity * curr.price,
                        0
                      ) +
                      (type === "delivery" ? deliveryFee : 0) +
                      serviceFee,
                  })
                )
              }
            >
              {loading ? (
                <MoonLoader
                  cssOverride={override}
                  size={15.6}
                  color="#E34B31"
                />
              ) : (
                "Apply Coupon"
              )}
            </button>
          </div>
          <div className="p-4 fixed bottom-0 left-0 right-0 bg-white shadow-sm-alt">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[1rem] leading-[1.5rem]">Total</span>
              <span className="font-[700] text-[1.25rem] leading-[1.75rem]">
                N
                {(
                  (cartItems || [])?.reduce(
                    (acc, curr) => acc + curr.quantity * curr.price,
                    0
                  ) +
                  (type === "delivery" ? deliveryFee : 0) +
                  serviceFee -
                  (couponAmount || 0)
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <ButtonSubmit
              // disabled={
              //   (type === "delivery" && !location && !formattedAddress) ||
              //   loading
              // }
              disabled={loading}
              loading={loading}
              text="Place order"
              onClick={handleSubmit}
              className="text-white bg-orange"
            />
          </div>
        </section>
      </AppLayout>
    </div>
  );
};

export default WarehouseCheckout;
