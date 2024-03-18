import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  updateTokens: (tokens: { accessToken: string; refreshToken: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tokens from AsyncStorage when the component mounts
    const loadTokens = async () => {
      const storedAccessToken = await AsyncStorage.getItem("accessToken");
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    };

    loadTokens();
  }, []);

  const updateTokens = async ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, updateTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
