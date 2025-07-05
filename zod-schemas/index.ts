import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { profiles, realms } from "@/db/schema";

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

export const insertRealmSchema = createInsertSchema(realms, {
	name: (schema) => schema.min(3, "Realm name must be at least 3 characters."),
	icon: (schema) =>
		schema.max(1, "Icon cannot exceed 1 character.").nullable().optional(),
}).omit({
	id: true,
	userId: true,
	isArchived: true,
	archivedAt: true,
	createdAt: true,
	updatedAt: true,
});

const baseOnboardingSchema = insertProfileSchema.extend(
	insertRealmSchema.shape,
);

export const onboardingFormSchema = baseOnboardingSchema.extend({
	avatarFile: z.instanceof(File).optional(),
});
