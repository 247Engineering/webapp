import { useOutlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AuthContextType } from '../../types'

const AuthedLayout = () => {
  const { user } = useAuth() as AuthContextType
  const outlet = useOutlet()

  if (!user) {
    return <Navigate to="/signin" />
  }

  return <>{outlet}</>
}

export default AuthedLayout
