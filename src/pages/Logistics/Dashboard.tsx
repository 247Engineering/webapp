import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSocketIO } from "react-use-websocket";

import noOrders from "../../assets/images/no-orders.svg";

import AppLayout from "../../components/layouts/AppLayout";

// import { AppDispatch, RootState } from "../../store";
// import { ProductState } from "../../types";
// import {
//   fetchAllProducts,
//   searchStoreProducts,
// } from "../../store/features/product";

const Dashboard = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const { products } = useSelector<RootState>(
  //   ({ product }) => product
  // ) as ProductState;

  // const [search, setSearch] = useState("");

  // useEffect(() => {
  //   console.log({ products, setSearch });
  //   if (search) {
  //     dispatch(searchStoreProducts(search));
  //   } else {
  //     dispatch(fetchAllProducts());
  //   }
  // }, [dispatch, search, products]);

  const tokens = JSON.parse(localStorage.getItem("tokens") as string);
  document.cookie = `Authorization=Bearer ${tokens?.access_token}; path=/`;

  const response = useSocketIO(`${process.env.REACT_APP_BASE_URL}/orders`);
  console.log({ socket: response });

  return (
    <>
      <AppLayout logistics>
        <div className="flex flex-col justify-center items-center mt-[9.875rem]">
          <img src={noOrders} alt="no orders" />
          <h1 className="mt-6 font-[700] text-[1.25rem] leading-[1.75rem]">
            Looking for orders
          </h1>
          <p className="mt-2 text-black-100 text-[1rem] leading-[1.5rem] text-center max-w-[11.938rem]">
            Don't worry we'll get you something soon
          </p>
        </div>
      </AppLayout>
    </>
  );
};

export default Dashboard;
