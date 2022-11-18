import { Routes, Route, Navigate } from 'react-router-dom'

import AuthedLayout from '../components/layouts/AuthedLayout'
import UnauthedLayout from '../components/layouts/UnauthedLayout'

import AccountSelect from '../pages/AccountSelect'
import ResetPassword from '../pages/ResetPassword'
import Current from '../pages/Distributor/Warehouse/AddWarehouseProduct'

import {
  unAuthedDistributorRoutes,
  authedDistributorRoutes,
} from './distributor'
import { unAuthedRetailerRoutes, authedRetailerRoutes } from './retailer'

import * as ROUTES from '../routes'

export default function App() {
  return (
    <Routes>
      <Route element={<UnauthedLayout />}>
        <Route path="/" element={<Current />} />
        <Route path="/" element={<AccountSelect />} />
        <Route path={ROUTES.AUTH.ACCOUNT_SELECT} element={<AccountSelect />} />
        <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />

        {unAuthedDistributorRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {unAuthedRetailerRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route
          path="*"
          element={<Navigate to={ROUTES.AUTH.ACCOUNT_SELECT} replace />}
        />
      </Route>

      <Route element={<AuthedLayout />}>
        {authedDistributorRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {authedRetailerRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}
