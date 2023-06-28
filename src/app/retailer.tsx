import SignIn from '../pages/SignIn'
import SignUp from '../pages/Retailer/Onboarding/SignUp'
import ForgotPassword from '../pages/Retailer/Onboarding/ForgotPassword'
import VerifyOtp from '../pages/Retailer/Onboarding/VerifyOtp'
import BusinessInfoForm from '../pages/Retailer/BusinessInfoForm'
import RetailerStore from '../pages/Retailer/Store/RetailerStore'
import RetailerStoreItem from '../pages/Retailer/Store/RetailerStoreItem'
import RetailerCart from '../pages/Retailer/Store/RetailerCart'
import RetailerCheckout from '../pages/Retailer/Store/RetailerCheckout'
import RetailerPayment from '../pages/Retailer/Store/RetailerPayment'
import RetailerTransferPayment from '../pages/Retailer/Store/RetailerTransferPayment'
import RetailerOrders from '../pages/Retailer/Store/RetailerOrders';
import RetailerOrderStatusNotification from '../pages/Retailer/Store/RetailerOrderStatusNotification';
import RetailerOrderStatus from '../pages/Retailer/Store/RetailerOrderStatus';

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
  {
    path: ROUTES.RETAILER.CART,
    element: <RetailerCart />,
  },
  {
    path: ROUTES.RETAILER.CHECKOUT,
    element: <RetailerCheckout />,
  },
  {
    path: ROUTES.RETAILER.PAYMENT,
    element: <RetailerPayment />,
  },
  {
    path: ROUTES.RETAILER.TRANSFER_PAYMENT,
    element: <RetailerTransferPayment />,
  },
  {
    path: ROUTES.RETAILER.ORDERS,
    element: <RetailerOrders />,
  },
  {
    path: ROUTES.RETAILER.ORDER_NOTIFICATION,
    element: <RetailerOrderStatusNotification />,
  },
  {
    path: ROUTES.RETAILER.ORDER_STATUS,
    element: <RetailerOrderStatus />,
  },
]
