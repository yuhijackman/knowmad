import type { z } from "zod";

export type ValidatedActionResponse<
	T,
	TSchema extends z.ZodTypeAny = z.ZodTypeAny,
> = {
	success: boolean;
	data?: T;
	errors?: z.ZodIssue[];
	message?: string;
	submittedData?: Partial<z.infer<TSchema>>;
};

/**
 * @param schema The Zod schema to validate the input data against.
 * @param actionFn The actual server action function to execute if validation passes.
 * @returns A new server action function that includes validation and consistent response handling.
 */
export function validatedAction<TSchema extends z.ZodTypeAny, TResult>(
	schema: TSchema,
	actionFn: (data: z.infer<TSchema>) => Promise<TResult>,
) {
	return async (
		_prevState: ValidatedActionResponse<TResult> | undefined,
		formData: FormData,
	): Promise<ValidatedActionResponse<TResult>> => {
		const rawFormData = Object.fromEntries(formData.entries());
		const validationResult = schema.safeParse(rawFormData);

		if (!validationResult.success) {
			return {
				success: false,
				errors: validationResult.error.issues,
				message: "Validation failed. Please check your input.",
				submittedData: rawFormData as Partial<z.infer<TSchema>>,
			};
		}

		try {
			const data = validationResult.data;
			const result = await actionFn(data);
			return { success: true, data: result };
		} catch (error) {
			const submittedData = rawFormData as Partial<z.infer<TSchema>>;
			if (error instanceof Error) {
				return {
					success: false,
					message: error.message || "An unexpected error occurred.",
					submittedData,
				};
			}
			return {
				success: false,
				message: "An unexpected error occurred.",
				submittedData,
			};
		}
	};
}
