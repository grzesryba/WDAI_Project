import { createContext, useContext, useReducer, ReactNode } from "react";

interface User {
  username: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

interface AuthContextType {
  auth: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, dispatch] = useReducer(authReducer, initialAuthState);
  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
