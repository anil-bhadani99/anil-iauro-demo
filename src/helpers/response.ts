export function resSuccess(message: String, statusCode: Number, data: any) {
	return {
		message,
		status: true,
		statusCode,
		data: data
	};
};

export function resError(message: String, statusCode: Number) {

	return {
		message,
		status: false,
		statusCode
	};
};