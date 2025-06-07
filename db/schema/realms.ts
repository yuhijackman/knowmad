// The main container for a single learning topic.
import { profiles } from "@/db/schema/profiles";
import { templates } from "@/db/schema/templates";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const realms = pgTable(
	"realms",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.references(() => profiles.id, { onDelete: "cascade" })
			.notNull(),
		name: text("name").notNull(),
		description: text("description"),
		icon: text("icon"),
		isArchived: boolean("is_archived").default(false).notNull(),
		archivedAt: timestamp("archived_at", { withTimezone: true }),
		// this field is used to analyze how many realms are created from templates
		// and which templates are most popular
		// and to allow users to add chambers when templates are updated
		createdFromTemplateId: uuid("created_from_template_id").references(
			() => templates.id,
			{ onDelete: "set null" },
		),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [index("realm_user_idx").on(table.userId)],
);
