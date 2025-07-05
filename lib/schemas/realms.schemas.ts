import { createInsertSchema } from "drizzle-zod";
import { realms } from "@/db/schema";

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
