// JOIN TABLE: resource_tags
// Establishes the many-to-many relationship between resources and tags.

import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { profiles } from "@/db/schema/profiles";
import { resources } from "@/db/schema/resources";
import { tags } from "@/db/schema/tags";

export const resourceTags = pgTable(
	"resource_tags",
	{
		resourceId: uuid("resource_id")
			.notNull()
			.references(() => resources.id, { onDelete: "cascade" }),
		tagId: uuid("tag_id")
			.notNull()
			.references(() => tags.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => profiles.id, { onDelete: "cascade" }),
	},
	(table) => {
		// Composite primary key to ensure a tag is only applied once per resource.
		return [primaryKey({ columns: [table.resourceId, table.tagId] })];
	},
);
