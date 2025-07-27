import React from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router";
import LoadingPage from "~/components/loading";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingPage />;
  }
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
