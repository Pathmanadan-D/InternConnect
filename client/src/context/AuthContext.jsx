import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Failed to parse stored user", err);
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    const response = await axios.post("/auth/login", { email, password });
    const { token: jwt, user: userData } = response.data || {};
    setToken(jwt);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    const { token: jwt, user: userData } = response.data || {};
    setToken(jwt);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isAdmin: Boolean(user?.role === "admin"),
      login,
      register,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}


