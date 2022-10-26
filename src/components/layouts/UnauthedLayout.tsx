import { Navigate, useOutlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AuthContextType } from '../../types'

const UnauthedLayout = () => {
  const { user } = useAuth() as AuthContextType
  const outlet = useOutlet()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{outlet}</>
}

export default UnauthedLayout