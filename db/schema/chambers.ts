// Represents a structural unit within a Realm (e.g., a chapter, a section).

import {
	doublePrecision,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { profiles } from "@/db/schema/profiles";
import { realms } from "@/db/schema/realms";

export const chambers = pgTable(
	"chambers",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		realmId: uuid("realm_id")
			.notNull()
			.references(() => realms.id, { onDelete: "cascade" }),
		// Why do we store userId on chambers?
		// This is a crucial optimization for security and performance.
		// It allows us to quickly determine if a user has access to a chamber without complex queries.
		// If we didn't store userId directly on chambers, we would have to perform a more complex query to check access.
		// This is especially important for performance in large applications with many chambers and users.
		// Example:
		// Consider a scenario where a user is trying to access a chamber.
		// If the chamber has a userId field that matches the current user's ID, access is granted immediately.
		// If the chamber does not have a userId field, the security policy would have to perform a more complex query to check if the user has access.
		// This is because the security policy would have to check if the user's ID exists in the realms table where the realms.id matches this chamber's realm.
		// This is a significant performance optimization, especially in large applications with many chambers and users.
		// This is a common pattern in database design to optimize access control checks.
		userId: uuid("user_id")
			.notNull()
			.references(() => profiles.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		description: text("description"),
		chamberOrder: doublePrecision("chamber_order"), // For ordering chambers within a realm
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [index("chamber_realm_idx").on(table.realmId)],
);
