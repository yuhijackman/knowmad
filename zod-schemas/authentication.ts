import { users } from "@/db/schema/users";
import { createInsertSchema } from "drizzle-zod";
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
		path: ["repeatPassword"], // This targets the 'confirmPassword' field for the error
	});

export const insertUserDbSchema = createInsertSchema(users, {
	id: (schema) => schema.min(1, { message: "User ID is required." }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type InsertUserInput = z.infer<typeof insertUserDbSchema>;
