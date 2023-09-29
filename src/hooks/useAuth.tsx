import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useLocalStorage } from "./useLocalStorage";
import { AuthContextType, UserContext } from "../types";
import { RootState, AppDispatch } from "../store";
import * as ROUTES from "../routes";
import { fetchCart } from "../store/features/retailer";

const AuthContext = createContext<AuthContextType | null>(null);

const distributorStep = {
  1: ROUTES.DISTRIBUTOR.ACCOUNT_SETUP,
  // 2: ROUTES.DISTRIBUTOR.ACCOUNT_SETUP,
  2: ROUTES.DISTRIBUTOR.DASHBOARD,
  3: ROUTES.DISTRIBUTOR.DASHBOARD,
};

const retailerStep = {
  1: ROUTES.RETAILER.BUSINESS_INFO_FORM,
  2: ROUTES.RETAILER.DASHBOARD,
};

const logisticsStep = {
  1: ROUTES.LOGISTICS.ACCOUNT_SETUP,
  2: ROUTES.LOGISTICS.ACCOUNT_SETUP,
  3: ROUTES.LOGISTICS.DASHBOARD,
};

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const step = useSelector<RootState>(
    ({ auth }) => auth.stepsCompleted
  ) as number;

  const [user, setUser] = useLocalStorage("user", null);

  const login = useCallback(
    async (data: UserContext) => {
      setUser(data);
      switch (data.type) {
        case "distributor":
          navigate(distributorStep[step as 1 | 2 | 3], { replace: true });
          break;
        case "warehouse":
          navigate(ROUTES.DISTRIBUTOR.WAREHOUSES);
          break;
        case "retailer":
          dispatch(fetchCart(false));
          navigate(retailerStep[step as 1 | 2], { replace: true });
          break;
        case "logistics":
          navigate(logisticsStep[(step as 1 | 2, 3)], { replace: true });
          break;
      }
    },
    [setUser, step, dispatch, navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.clear();
    navigate(ROUTES.AUTH.ACCOUNT_SELECT, { replace: true });
    window.location.reload();
  }, [setUser, navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
