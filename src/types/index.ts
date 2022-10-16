import { type } from "os";

export interface UserContext {
  firstName: string;
  lastName: string;
  id: string;
}

export type AuthContextType = {
  user: UserContext;
  login: (data: UserContext) => Promise<void>;
  logout: () => void;
}

export interface AuthState {
  firstName: string | null;
  lastName: string | null;
  id: string | null;
  type: string | null;
  loading: boolean;
}