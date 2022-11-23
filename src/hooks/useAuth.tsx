import { createContext, useCallback, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useLocalStorage } from './useLocalStorage'
import { AuthContextType, UserContext } from '../types'
import { RootState } from '../store'
import * as ROUTES from '../routes'

const AuthContext = createContext<AuthContextType | null>(null)

const distributorStep = {
  1: ROUTES.DISTRIBUTOR.ACCOUNT_SETUP,
  2: ROUTES.DISTRIBUTOR.ACCOUNT_SETUP,
  3: ROUTES.DISTRIBUTOR.DASHBOARD,
}

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate()

  const step = useSelector<RootState>(
    ({ auth }) => auth.stepsCompleted,
  ) as number

  const [user, setUser] = useLocalStorage('user', null)

  const login = useCallback(
    async (data: UserContext) => {
      setUser(data)
      switch (data.type) {
        case 'distributor':
          navigate(distributorStep[step as 1 | 2 | 3], { replace: true })
          break
        case 'warehouse':
          navigate(ROUTES.DISTRIBUTOR.WAREHOUSE_PRODUCTS_FOR(data.id))
        // case 'retailer':
        //   navigate()
      }
    },
    [setUser, navigate, step],
  )

  const logout = useCallback(() => {
    setUser(null)
    localStorage.clear()
    navigate(ROUTES.AUTH.ACCOUNT_SELECT, { replace: true })
    window.location.reload()
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
