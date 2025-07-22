import React from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router";
import { Loader2 } from "lucide-react";

const LoadingPage = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="fixed inset-0 bg-cosmic-gradient opacity-60 pointer-events-none"></div>
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(2px 2px at 20px 30px, #8b5cf6, transparent), 
                         radial-gradient(2px 2px at 40px 70px, #3b82f6, transparent),
                         radial-gradient(1px 1px at 90px 40px, #06b6d4, transparent),
                         radial-gradient(1px 1px at 130px 80px, #a855f7, transparent),
                         radial-gradient(2px 2px at 160px 30px, #8b5cf6, transparent)`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 100px",
        animation: "float 20s linear infinite",
      }}
    ></div>
    <div className="relative z-10 flex flex-col items-center gap-4 text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-slate-300">Loading your cosmic journey...</p>
    </div>
  </div>
);

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
