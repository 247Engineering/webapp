import SignIn from "../pages/SignIn";
import SignUp from "../pages/Logistics/Onboarding/SignUp";
import ForgotPassword from "../pages/Logistics/Onboarding/ForgotPassword";
import VerifyOtp from "../pages/Logistics/Onboarding/VerifyOtp";
import AccountSetup from "../pages/Logistics/Onboarding/AccountSetup";
import VehicleInfo from "../pages/Logistics/VehicleInfoForm";
import OrderStatus from "../pages/Logistics/OrderStatus";
import OrderPrompt from "../pages/Logistics/OrderPrompt";
import Deliveries from "../pages/Logistics/Deliveries";
import Transfer from "../pages/Logistics/Transfer";
import Wallet from "../pages/Logistics/Wallet";
import AddBank from "../pages/Logistics/AddBank";

import * as ROUTES from "../routes";
import Dashboard from "../pages/Logistics/Dashboard";

export const unAuthedLogisticsRoutes = [
  {
    path: ROUTES.LOGISTICS.SIGNUP,
    element: <SignUp />,
  },
  {
    path: ROUTES.LOGISTICS.SIGNIN,
    element: (
      <SignIn
        type="logistics"
        forgotPassword={ROUTES.LOGISTICS.FORGOT_PASSWORD}
      />
    ),
  },
  {
    path: ROUTES.LOGISTICS.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.LOGISTICS.VERIFY_OTP,
    element: <VerifyOtp />,
  },
];

export const authedLogisticsRoutes = [
  {
    path: ROUTES.LOGISTICS.ACCOUNT_SETUP,
    element: <AccountSetup />,
  },
  {
    path: ROUTES.LOGISTICS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.LOGISTICS.BUSINESS_INFO_FORM,
    element: <VehicleInfo />,
  },
  {
    path: ROUTES.LOGISTICS.ORDER_PROMPT,
    element: <OrderPrompt />,
  },
  {
    path: ROUTES.LOGISTICS.ORDER_STATUS,
    element: <OrderStatus />,
  },
  {
    path: ROUTES.LOGISTICS.DELIVERIES,
    element: <Deliveries />,
  },
  {
    path: ROUTES.LOGISTICS.TRANSFER,
    element: <Transfer />,
  },
  {
    path: ROUTES.LOGISTICS.WALLET,
    element: <Wallet />,
  },
  {
    path: ROUTES.LOGISTICS.ADD_BANK,
    element: <AddBank />,
  },
  {
    path: ROUTES.LOGISTICS.ADD_PAYMENT,
    element: <AddBank addPayment />,
  },
];
