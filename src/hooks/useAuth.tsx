import { createContext, useCallback, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import { AuthContextType, UserContext } from '../types'

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()

  const login = useCallback(
    async (data: UserContext) => {
      setUser(data)
      navigate('/dashboard', { replace: true })
    },
    [setUser, navigate],
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
