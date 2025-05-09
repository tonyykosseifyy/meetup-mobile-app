type SessionType = {
	accessToken?: string;
	refreshToken?: string;
};

interface RequestParams {
	pathExtension: string;
	method: "GET" | "POST" | "PATCH" | "DELETE";
	body?: any;
	headers?: Record<string, string>;
	secure?: boolean;
}

  
export { SessionType, RequestParams };
