import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserInfo } from "@/interfaces";

interface AuthContextType {
  userInfo: UserInfo | null | undefined;
  updateUserInfo: (userInfo: UserInfo | null | undefined) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const updateUserInfo = async (userInfo: UserInfo | undefined | null) => {
    setUserInfo(userInfo);
  };
  children;
  return (
    <AuthContext.Provider value={{ userInfo, updateUserInfo }}>{children}</AuthContext.Provider>
  );
};
