import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import AsyncStore from "../storage/async-store";

interface SessionType {
  accessToken: string;
  refreshToken: string;
}

class AuthSession {
  private static instance: AuthSession;
  private session: SessionType;
  private sessionDirty: boolean = true;
  private store: AsyncStore = AsyncStore.getInstance();

  private constructor() {
    this.session = { accessToken: "", refreshToken: "" };
  }

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
      const session = await this.store.extractTokensFromStorage();
      this.setSession(session);
      this.setSessionDirty(false);
    }
    return this.session;
  }
  
  private setSession(session: SessionType): void {
    this.session = session;
  }

  public async updateSession(session: SessionType): Promise<void> {
    await this.store.updateTokensFromStorage(session.accessToken, session.refreshToken);
    this.setSession(session);
  }

  public async clearSession(): Promise<void> {
    await this.store.clearTokensFromStorage();
    this.setSession({ accessToken: "", refreshToken: "" });
  }
}

export default AuthSession; 