import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "@/db/schema/profiles";

// For more granular, flexible organization of resources. Each tag is unique per user.
export const tags = pgTable(
	"tags",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => profiles.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [index("tag_user_idx").on(table.userId)],
);
