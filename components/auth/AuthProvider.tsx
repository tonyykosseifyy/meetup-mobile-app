import React, { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "react-query";
import { getMe, lookup } from "@/api/users";
import { clearTokens } from "@/api/tokens";
import { UserInfo } from "@/interfaces";
import { router } from "expo-router";
import { View, Text } from "react-native";

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

  // if (error) {
  //   setIsAuthenticated(false);
  //   clearTokens();
  // }
  // if (data) {
  //   console.log(data.data);
  //   // setUserInfo(data);
  // }

  const updateUserInfo = async (userInfo: UserInfo | undefined | null) => {
    setUserInfo(userInfo);
  };
  children;
  return (
    <AuthContext.Provider value={{ userInfo, updateUserInfo }}>{children}</AuthContext.Provider>
  );
};
