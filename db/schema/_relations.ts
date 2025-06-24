import { relations } from "drizzle-orm";
import { chambers } from "@/db/schema/chambers";
import { profiles } from "@/db/schema/profiles";
import { realms } from "@/db/schema/realms";
import { resources } from "@/db/schema/resources";
import { resourceTags } from "@/db/schema/resourceTags";
import { tags } from "@/db/schema/tags";
import { tasks } from "@/db/schema/tasks";
import { templates } from "@/db/schema/templates";

export const profilesRelations = relations(profiles, ({ many }) => ({
	realms: many(realms),
	chambers: many(chambers),
	tasks: many(tasks),
	resources: many(resources),
	tags: many(tags),
	resourceTags: many(resourceTags),
}));

export const realmsRelations = relations(realms, ({ one, many }) => ({
	profile: one(profiles, {
		fields: [realms.userId],
		references: [profiles.id],
	}),
	template: one(templates, {
		fields: [realms.createdFromTemplateId],
		references: [templates.id],
	}),
	chambers: many(chambers),
	resources: many(resources),
}));

export const chambersRelations = relations(chambers, ({ one, many }) => ({
	realm: one(realms, {
		fields: [chambers.realmId],
		references: [realms.id],
	}),
	profile: one(profiles, {
		fields: [chambers.userId],
		references: [profiles.id],
	}),
	tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
	chamber: one(chambers, {
		fields: [tasks.chamberId],
		references: [chambers.id],
	}),
	profile: one(profiles, {
		fields: [tasks.userId],
		references: [profiles.id],
	}),
}));

export const resourcesRelations = relations(resources, ({ one, many }) => ({
	realm: one(realms, {
		fields: [resources.realmId],
		references: [realms.id],
	}),
	profile: one(profiles, {
		fields: [resources.userId],
		references: [profiles.id],
	}),
	resourceTags: many(resourceTags),
}));

export const tagsRelations = relations(tags, ({ one, many }) => ({
	profile: one(profiles, {
		fields: [tags.userId],
		references: [profiles.id],
	}),
	resourceTags: many(resourceTags),
}));

export const resourceTagsRelations = relations(resourceTags, ({ one }) => ({
	resource: one(resources, {
		fields: [resourceTags.resourceId],
		references: [resources.id],
	}),
	tag: one(tags, {
		fields: [resourceTags.tagId],
		references: [tags.id],
	}),
	profile: one(profiles, {
		fields: [resourceTags.userId],
		references: [profiles.id],
	}),
}));
