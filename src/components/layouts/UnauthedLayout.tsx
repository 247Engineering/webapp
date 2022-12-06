import { Navigate, useOutlet } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { AuthContextType } from '../../types'
import * as ROUTES from '../../routes'

const UnauthedLayout = () => {
  const { user } = useAuth() as AuthContextType
  const outlet = useOutlet()

  if (user) {
    return (
      <Navigate
        to={
          ROUTES[user?.type?.toUpperCase() as 'RETAILER' | 'DISTRIBUTOR']
            ?.DASHBOARD
        }
        replace
      />
    )
  }

  return <>{outlet}</>
}

export default UnauthedLayout
