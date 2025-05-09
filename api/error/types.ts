interface ErrorData {
	name?: string;
	message?: string;
}

interface IResponseError {
	name: string;
	message: string;
	status?: number;
	isAxiosError: boolean;
}


export { ErrorData, IResponseError };