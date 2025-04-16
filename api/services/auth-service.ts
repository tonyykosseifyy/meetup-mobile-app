import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface SessionType {
  accessToken: string;
  refreshToken: string;
}

class AuthSession {
  private static instance: AuthSession;
  private session: SessionType;
  private sessionDirty: boolean = true;

  private constructor() {}

  public static getInstance(): AuthSession {
    if (!AuthSession.instance) {
      AuthSession.instance = new AuthSession();
    }
    return AuthSession.instance;
  }

  private isSessionDirty(): boolean {
    return this.sessionDirty;
  }
  private setSessionDirty(dirty: boolean): void {
    this.sessionDirty = dirty;
  }
  
  private async getSession(): Promise<SessionType> {
    if (this.isSessionDirty()) {
      this.session = await this.extractTokensFromStorage();
    }
    return this.session;
  }
  
  private setSession(session: SessionType): void {
    this.session = session;
  }
}

export default AuthSession; 