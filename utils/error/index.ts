import type { RedirectError } from "next/dist/client/components/redirect-error";

const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
enum RedirectStatusCode {
	SeeOther = 303,
	TemporaryRedirect = 307,
	PermanentRedirect = 308,
}

export function isRedirectError(error: unknown): error is RedirectError {
	if (
		typeof error !== "object" ||
		error === null ||
		!("digest" in error) ||
		typeof error.digest !== "string"
	) {
		return false;
	}

	const digest = error.digest.split(";");
	const [errorCode, type] = digest;
	const destination = digest.slice(2, -2).join(";");
	const status = digest.at(-2);

	const statusCode = Number(status);

	return (
		errorCode === REDIRECT_ERROR_CODE &&
		(type === "replace" || type === "push") &&
		typeof destination === "string" &&
		!Number.isNaN(statusCode) &&
		statusCode in RedirectStatusCode
	);
}
