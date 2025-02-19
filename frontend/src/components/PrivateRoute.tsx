import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
