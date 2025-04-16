interface Config {
  API_URL: string;
  API_KEY: string;
}

class AppConfig {
  private static instance: AppConfig;
  private config: Config;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  private loadConfig(): Config {
    return {
      API_URL: this.getEnvKey(this.getAPIUrl, "API_KEY"),
      API_KEY: this.getEnvKey(this.getAPIKey, "API_KEY"),
    };
  }

  private getEnvKey(extractKey: () => string | undefined, key: string): string {
    const value = extractKey();
    if (!value) {
    	throw new Error(`${key} not found in environment variables`);
    }
    return value;
  }
  
  private getAPIUrl(): string | undefined {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  private getAPIKey(): string | undefined {
    return process.env.EXPO_PUBLIC_API_KEY;
  }

	public getConfig(): Config {
		return this.config;
	}
}

export default AppConfig; 