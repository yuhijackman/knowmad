import { createInsertSchema } from "drizzle-zod";
import { profiles } from "@/db/schema";

export const insertProfileSchema = createInsertSchema(profiles, {
	firstName: (schema) =>
		schema
			.min(1, "First name cannot be empty.")
			.max(30, "First name cannot exceed 30 characters."),
	lastName: (schema) =>
		schema
			.min(1, "Last name cannot be empty.")
			.max(30, "Last name cannot exceed 30 characters."),
}).pick({
	firstName: true,
	lastName: true,
});
