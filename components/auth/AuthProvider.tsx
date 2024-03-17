import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  updateTokens: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => void;
}

// Create the context with an undefined initial value but specify the type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component with proper typing
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken");
  });

  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    return localStorage.getItem("refreshToken");
  });

  // Specify the argument types directly in the function parameter
  const updateTokens = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  // Provide the context value with explicit type
  const value = { accessToken, refreshToken, updateTokens };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
