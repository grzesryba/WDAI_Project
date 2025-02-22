import {createContext, ReactNode, useContext, useState} from "react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
      sessionStorage.getItem("authToken") // Pobiera token z localStorage
  );

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(backendUrl+"/login", {
        username,
        password,
      });
      const token = response.data.token;
      setToken(token);
      sessionStorage.setItem("authToken", token); // Zapisuje token w sesioanStorage
    } catch (err) {
      console.error("Login failed:", err);
      throw new Error("Invalid username or password");
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("authToken"); // Usuwa token z localStorage
  };

  return (
      <AuthContext.Provider value={{ token, login, logout }}>
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
