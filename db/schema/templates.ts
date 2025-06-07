// Stores predefined structures for creating new Realms.
import {
	boolean,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const templates = pgTable("templates", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull().unique(),
	description: text("description"),
	icon: text("icon"),
	// The JSONB blueprint defining chambers, placeholder tasks, etc.
	predefinedStructure: jsonb("predefined_structure"),
	isSystemTemplate: boolean("is_system_template").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
