import SignIn from '../pages/Retailer/Onboarding/SignIn'
import SignUp from '../pages/Retailer/Onboarding/SignUp'
import ForgotPassword from '../pages/Retailer/Onboarding/ForgotPassword'
import VerifyOtp from '../pages/Retailer/Onboarding/VerifyOtp'
import BusinessInfoForm from '../pages/Retailer/BusinessInfoForm'
import RetailerShop from '../pages/Retailer/Shop/RetailerShop'

import * as ROUTES from '../routes'

export const unAuthedRetailerRoutes = [
  {
    path: ROUTES.RETAILER.SIGNUP,
    element: <SignUp />,
  },
  {
    path: ROUTES.RETAILER.SIGNIN,
    element: <SignIn />,
  },
  {
    path: ROUTES.RETAILER.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.RETAILER.VERIFY_OTP,
    element: <VerifyOtp />,
  },
]

export const authedRetailerRoutes = [
  {
    path: ROUTES.RETAILER.BUSINESS_INFO_FORM,
    element: <BusinessInfoForm />,
  },
  {
    path: ROUTES.RETAILER.DASHBOARD,
    element: <RetailerShop />,
  },
]
