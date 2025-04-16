import AsyncStorage from "@react-native-async-storage/async-storage";
import { SessionType } from "./types";


class AsyncStore {
  private static instance: AsyncStore;
  private constructor() {}

  public static getInstance(): AsyncStore {
    if (!AsyncStore.instance) {
      AsyncStore.instance = new AsyncStore();
    }
    return AsyncStore.instance;
  }

  public async extractTokensFromStorage(): Promise<SessionType> {
    const [ [, accessToken], [, refreshToken] ] = await AsyncStorage.multiGet(["accessToken", "refreshToken"]);
    return { accessToken: accessToken ?? "", refreshToken: refreshToken ?? "" };
  }

  public async clearTokensFromStorage(): Promise<void> {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
  }

  public async updateTokensFromStorage(accessToken: string, refreshToken: string): Promise<void> {
    await AsyncStorage.multiSet([
      ["accessToken", accessToken],
      ["refreshToken", refreshToken],
    ]);
  }
}

export default AsyncStore; 