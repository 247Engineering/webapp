import { Routes, Route, Navigate } from 'react-router-dom'
import AuthedLayout from './components/layouts/AuthedLayout'
import UnauthedLayout from './components/layouts/UnauthedLayout'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ForgotPassword from './pages/Onboarding/ForgotPassword'
import AccountSelect from './pages/Onboarding/AccountSelect'
import VerifyMail from './pages/Onboarding/VerifyMail'
import AccountProgress from './pages/Onboarding/AccountProgress'
import BusinessInfoForm from './pages/BusinessInfoForm'
import BusinessOwner from './pages/BusinessOwner'
import BusinessOwnerForm from './pages/BusinessOwnerForm'
import BusinessOwnerReview from './pages/BusinessOwnerReview'
import WarehouseLocations from './pages/WarehouseLocations'
import WarehouseForm from './pages/WarehouseForm'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import ResetPassword from './pages/Onboarding/ResetPassword';

export default function App() {
  return (
    <Routes>
      <Route element={<UnauthedLayout />}>
        <Route path="/account-select" element={<AccountSelect />} />
        <Route path="/verify-mail" element={<VerifyMail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Route>

      <Route element={<AuthedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders/:order" element={<OrderDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/warehouse/form" element={<WarehouseForm />} />
        <Route path="/warehouses" element={<WarehouseLocations />} />
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
