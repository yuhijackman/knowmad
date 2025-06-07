import { pgTable, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey(),
	},
	(_table) => [{ $schema: "auth" }],
);
