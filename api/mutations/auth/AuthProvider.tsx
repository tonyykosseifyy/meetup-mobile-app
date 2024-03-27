import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUserInfo } from "../../services/interfaces";

interface AuthContextType {
  registeredUser: IUserInfo | null | undefined;
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
  const [registeredUser, setRegisteredUser] = useState<IUserInfo | null>(null);

  return (
    <AuthContext.Provider
      value={{
        updateContextUser: setRegisteredUser,
        registeredUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
