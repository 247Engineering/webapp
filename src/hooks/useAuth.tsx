import { createContext, useCallback, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useLocalStorage } from './useLocalStorage'
import { AuthContextType, UserContext } from '../types'
import { RootState } from '../store'

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate()

  const step = useSelector<RootState>(
    ({ distributor }) => distributor.stepsCompleted,
  ) as number

  const [user, setUser] = useLocalStorage('user', null)

  const login = useCallback(
    async (data: UserContext) => {
      setUser(data)
      navigate(step === 3 ? 'dashboard' : '/account-setup', { replace: true })
    },
    [setUser, navigate, step],
  )

  const logout = useCallback(() => {
    setUser(null)
    navigate('/signin', { replace: true })
  }, [setUser, navigate])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
