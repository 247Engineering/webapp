import SignIn from "../pages/SignIn";
import SignUp from "../pages/Logistics/Onboarding/SignUp";
import ForgotPassword from "../pages/Logistics/Onboarding/ForgotPassword";
import VerifyOtp from "../pages/Logistics/Onboarding/VerifyOtp";
import VehicleInfo from "../pages/Logistics/VehicleInfoForm";

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
    path: ROUTES.LOGISTICS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.LOGISTICS.BUSINESS_INFO_FORM,
    element: <VehicleInfo />,
  },
];
