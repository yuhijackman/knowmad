// Stores links, notes, or files associated with a Learning Space.

import {
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { profiles } from "@/db/schema/profiles";
import { realms } from "@/db/schema/realms";

export const ResourceType = {
	url: "Url",
	note: "Note",
	file: "File",
} as const;

export const resourceTypeEnum = pgEnum("ResourceType", [
	ResourceType.url,
	ResourceType.note,
	ResourceType.file,
]);

export const resources = pgTable(
	"resources",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		realmId: uuid("realm_id")
			.notNull()
			.references(() => realms.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => profiles.id, { onDelete: "cascade" }),
		type: resourceTypeEnum().notNull(),
		title: text("title").notNull(),
		description: text("description"),
		contentUrl: text("content_url"), // For 'url' type
		contentNote: text("content_note"), // For 'note' type
		filePath: text("file_path"), // For 'file' type (path in Storage)
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [index("resource_realm_idx").on(table.realmId)],
);
