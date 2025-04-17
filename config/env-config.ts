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
      API_URL: this.getEnvKey(this.getAPIUrl.bind(this), "API_URL"),
      API_KEY: this.getEnvKey(this.getAPIKey.bind(this), "API_KEY"),
    };
  }

  private getEnvKey(extractKey: () => string | undefined, key: string): string {
    const value = extractKey();
    console.log('value', value);
    if (!value) {
    	throw new Error(`${key} not found in environment variables`);
    }
    return value;
  }
  
  private getAPIUrl(): string | undefined {
    console.log('process.env.EXPO_PUBLIC_API_URL', process.env.EXPO_PUBLIC_API_URL);
    return "https://le2ini-production.up.railway.app";
  }

  private getAPIKey(): string | undefined {
    return "abc123";
  }

	public getConfig(): Config {
		return this.config;
	}
}

export default AppConfig; 