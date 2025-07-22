import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "~/hooks/useAuth";
import api, { API_URL } from "~/lib/api";
import { useNavigate } from "react-router";

interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = () => {
    console.log('Redirecting to Google login... (backend)');
    window.location.href = API_URL + "api/login/google";
  };

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}