import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUserInfo } from "@/interfaces";
import { useQuery } from "react-query";
import { getMe } from "@/api/axios/users";

interface AuthContextType {
  userInfo: IUserInfo | null | undefined;
  registeringUserInfo: IUserInfo | null | undefined;
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
  const { data, isError } = useQuery("/auth/userInfo", getMe, { retry: false });

  const [registeredUser, setRegisteredUser] = useState<IUserInfo | null>(null);

  return (
    <AuthContext.Provider
      value={{
        userInfo: data,
        updateContextUser: setRegisteredUser,
        registeringUserInfo: registeredUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
