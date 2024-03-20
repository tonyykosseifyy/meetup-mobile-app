import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUserInfo } from "@/interfaces";

interface AuthContextType {
  userInfo: IUserInfo | null;
  updateContextUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
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
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  children;
  return (
    <AuthContext.Provider value={{ userInfo, updateContextUser: setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
