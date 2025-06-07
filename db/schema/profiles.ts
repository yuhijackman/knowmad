import { users } from "@/db/schema/users";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
	id: uuid("id")
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade" }),
	firstName: varchar("first_name", { length: 30 }),
	lastName: varchar("last_name", { length: 30 }),
	avatarUrl: text("avatar_url"),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
