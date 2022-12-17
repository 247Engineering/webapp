import Dashboard from '../pages/Distributor/Dashboard/Dashboard'
import VerifyMail from '../pages/Distributor/Onboarding/VerifyMail'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/Distributor/Onboarding/SignUp'
import ForgotPassword from '../pages/Distributor/Onboarding/ForgotPassword'
import AccountSetup from '../pages/Distributor/Onboarding/AccountSetup'
import BusinessInfoForm from '../pages/Distributor/BusinessInfoForm'
import BusinessOwner from '../pages/Distributor/BusinessOwner'
import BusinessOwnerForm from '../pages/Distributor/BusinessOwnerForm'
import BusinessOwnerReview from '../pages/Distributor/BusinessOwnerReview'
import WarehouseForm from '../pages/Distributor/Warehouse/WarehouseForm'
import WarehouseFormEdit from '../pages/Distributor/Warehouse/WarehouseFormEdit'
import ChangeWarehouseManager from '../pages/Distributor/Warehouse/ChangeWarehouseManager'
import WarehouseLocations from '../pages/Distributor/Warehouse/WarehouseLocations'
import WarehouseSignUp from '../pages/Distributor/Onboarding/Warehouse/SignUp'
import WarehouseProducts from '../pages/Distributor/Warehouse/WarehouseProducts'
import AddWarehouseProduct from '../pages/Distributor/Warehouse/AddWarehouseProduct'
import WarehouseDetails from '../pages/Distributor/Warehouse/WarehouseDetails'
import WarehouseOrders from '../pages/Distributor/Warehouse/Orders/Orders'
import WarehouseOrderDetails from '../pages/Distributor/Warehouse/Orders/OrderDetails'
import ConfirmPickup from '../pages/Distributor/Warehouse/ConfirmPickup'

import * as ROUTES from '../routes'

export const unAuthedDistributorRoutes = [
  {
    path: ROUTES.DISTRIBUTOR.SIGNUP,
    element: <SignUp />,
  },
  {
    path: ROUTES.DISTRIBUTOR.SIGNIN,
    element: (
      <SignIn
        type="distributor"
        forgotPassword={ROUTES.DISTRIBUTOR.FORGOT_PASSWORD}
      />
    ),
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_SIGNUP,
    element: <WarehouseSignUp />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_LOGIN,
    element: (
      <SignIn
        type="warehouse"
        forgotPassword={ROUTES.DISTRIBUTOR.FORGOT_PASSWORD}
      />
    ),
  },
  {
    path: ROUTES.DISTRIBUTOR.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.DISTRIBUTOR.VERIFY_MAIL,
    element: <VerifyMail />,
  },
]

export const authedDistributorRoutes = [
  {
    path: ROUTES.DISTRIBUTOR.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.DISTRIBUTOR.ACCOUNT_SETUP,
    element: <AccountSetup />,
  },
  {
    path: ROUTES.DISTRIBUTOR.BUSINESS_OWNER,
    element: <BusinessOwner />,
  },
  {
    path: ROUTES.DISTRIBUTOR.BUSINESS_OWNER_FORM,
    element: <BusinessOwnerForm />,
  },
  {
    path: ROUTES.DISTRIBUTOR.BUSINESS_OWNER_REVIEW,
    element: <BusinessOwnerReview />,
  },
  {
    path: ROUTES.DISTRIBUTOR.BUSINESS_INFO_FORM,
    element: <BusinessInfoForm />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSES,
    element: <WarehouseLocations />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_DETAILS,
    element: <WarehouseDetails />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_FORM,
    element: <WarehouseForm />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_EDIT,
    element: <WarehouseFormEdit />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_CHANGE_MANAGER,
    element: <ChangeWarehouseManager />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCTS,
    element: <WarehouseProducts />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCTS,
    element: <WarehouseProducts />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_ORDERS,
    element: <WarehouseOrders />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_ORDER,
    element: <WarehouseOrderDetails />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_ORDER_CONFIRM,
    element: <ConfirmPickup />,
  },
  {
    path: ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCT_FORM,
    element: <AddWarehouseProduct />,
  },
]
