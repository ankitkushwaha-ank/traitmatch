import React from "react"
import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem("user")

  return isAuthenticated ? <>{children}</> : <Navigate to="/SignInPage" replace />
}

export default PrivateRoute
