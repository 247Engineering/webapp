import SignIn from '../pages/SignIn'
import SignUp from '../pages/Retailer/Onboarding/SignUp'
import ForgotPassword from '../pages/Retailer/Onboarding/ForgotPassword'
import VerifyOtp from '../pages/Retailer/Onboarding/VerifyOtp'
import BusinessInfoForm from '../pages/Retailer/BusinessInfoForm'
import RetailerStore from '../pages/Retailer/Store/RetailerStore'
import RetailerStoreItem from '../pages/Retailer/Store/RetailerStoreItem'

import * as ROUTES from '../routes'

export const unAuthedRetailerRoutes = [
  {
    path: ROUTES.RETAILER.SIGNUP,
    element: <SignUp />,
  },
  {
    path: ROUTES.RETAILER.SIGNIN,
    element: (
      <SignIn
        type="retailer"
        forgotPassword={ROUTES.RETAILER.FORGOT_PASSWORD}
      />
    ),
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
    element: <RetailerStore />,
  },
  {
    path: ROUTES.RETAILER.STORE_PRODUCT,
    element: <RetailerStoreItem />,
  },
]
