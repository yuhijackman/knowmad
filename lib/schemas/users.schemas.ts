import { createInsertSchema } from "drizzle-zod";
import { users } from "@/db/schema/users";

export const insertUserDbSchema = createInsertSchema(users, {
	id: (schema) => schema.min(1, { message: "User ID is required." }),
});
