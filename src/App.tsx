import { Routes, Route, Navigate } from 'react-router-dom'

import AuthedLayout from './components/layouts/AuthedLayout'
import UnauthedLayout from './components/layouts/UnauthedLayout'

import SignIn from './pages/Distributor/Onboarding/SignIn'
import SignUp from './pages/Distributor/Onboarding/SignUp'
import ForgotPassword from './pages/Distributor/Onboarding/ForgotPassword'
import AccountSelect from './pages/AccountSelect'
import VerifyMail from './pages/Distributor/Onboarding/VerifyMail'
import AccountProgress from './pages/Distributor/Onboarding/AccountSetup'
import BusinessInfoForm from './pages/Distributor/BusinessInfoForm'
import BusinessOwner from './pages/Distributor/BusinessOwner'
import BusinessOwnerForm from './pages/Distributor/BusinessOwnerForm'
import BusinessOwnerReview from './pages/Distributor/BusinessOwnerReview'
import WarehouseLocations from './pages/Distributor/Warehouse/WarehouseLocations'
import WarehouseForm from './pages/Distributor/Warehouse/WarehouseForm'
import Orders from './pages/Distributor/Order/Orders'
import OrderDetails from './pages/Distributor/Order/OrderDetails'
import Dashboard from './pages/Distributor/Dashboard/Dashboard'
import ResetPassword from './pages/ResetPassword'
import WarehouseProducts from './pages/Distributor/Warehouse/WarehouseProducts'
import AddWarehouseProduct from './pages/Distributor/Warehouse/AddWarehouseProduct'
import EditWarehouseProduct from './pages/Distributor/Warehouse/EditWarehouseProduct'

// import RetailerSignUp from './pages/Retailer/Onboarding/SignUp'
// import RetailerSignIn from './pages/Retailer/Onboarding/SignIn'
// import RetailerForgotPassword from './pages/Retailer/Onboarding/ForgotPassword'
import Current from './pages/Distributor/Warehouse/WarehouseForm'

export default function App() {
  return (
    <Routes>
      <Route element={<UnauthedLayout />}>
        <Route path="/" element={<Current />} />
        <Route path="/account-select" element={<AccountSelect />} />
        <Route path="/verify-mail" element={<VerifyMail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/account-select" replace />} />
      </Route>

      <Route element={<AuthedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/warehouses" element={<WarehouseLocations />} />
        <Route path="/warehouse/form" element={<WarehouseForm />} />
        <Route path="/warehouse/products" element={<WarehouseProducts />} />
        <Route
          path="/warehouse/products/form"
          element={<AddWarehouseProduct />}
        />
        <Route
          path="/warehouse/products/:productId/edit"
          element={<EditWarehouseProduct />}
        />
        <Route
          path="/business-owner/review"
          element={<BusinessOwnerReview />}
        />
        <Route path="/business-owner/form" element={<BusinessOwnerForm />} />
        <Route path="/business-owner" element={<BusinessOwner />} />
        <Route path="/business-info/form" element={<BusinessInfoForm />} />
        <Route path="/account-setup" element={<AccountProgress />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}
