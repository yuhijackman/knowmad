import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }).trim(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." }),
});

export const signUpSchema = z
	.object({
		email: z.string().email({ message: "Invalid email address." }).trim(),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long." }),
		repeatPassword: z.string().min(8, {
			message: "Repeat password must be at least 8 characters long.",
		}),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: "Passwords don't match.",
		path: ["repeatPassword"],
	});
export const forgotPasswordSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }).trim(),
});

export const updatePasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long." }),
		repeatPassword: z.string().min(8, {
			message: "Repeat password must be at least 8 characters long.",
		}),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: "Passwords don't match.",
		path: ["repeatPassword"],
	});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
