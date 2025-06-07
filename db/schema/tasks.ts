// Individual actionable items within a chamber.
import { chambers } from "@/db/schema/chambers";
import { profiles } from "@/db/schema/profiles";
import {
	doublePrecision,
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const TaskStatus = {
	toDo: "To Do",
	inProgress: "In Progress",
	completed: "Completed",
} as const;

export const TaskPriority = {
	low: "Low",
	medium: "Medium",
	high: "High",
} as const;

export const taskStatusEnum = pgEnum("TaskStatus", [
	TaskStatus.toDo,
	TaskStatus.inProgress,
	TaskStatus.completed,
]);

export const taskPriorityEnum = pgEnum("TaskPriority", [
	TaskPriority.low,
	TaskPriority.medium,
	TaskPriority.high,
]);

export const tasks = pgTable(
	"tasks",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		chamberId: uuid("chamber_id")
			.notNull()
			.references(() => chambers.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => profiles.id, { onDelete: "cascade" }),
		title: text("title").notNull(),
		description: text("description"),
		status: taskStatusEnum().default("To Do").notNull(),
		priority: taskPriorityEnum().default("Medium"),
		dueDate: timestamp("due_date", { withTimezone: true }),
		taskOrder: doublePrecision("task_order"), // For fractional indexing
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => [index("task_chamber_idx").on(table.chamberId)],
);
