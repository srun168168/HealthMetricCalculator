import { pgTable, text, serial, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bmiRecords = pgTable("bmi_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  age: integer("age").notNull(),
  weight: real("weight").notNull(),
  height: real("height").notNull(), // stored in centimeters
  bmi: real("bmi").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bmiRecords: many(bmiRecords),
}));

export const bmiRecordsRelations = relations(bmiRecords, ({ one }) => ({
  user: one(users, {
    fields: [bmiRecords.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBmiRecordSchema = createInsertSchema(bmiRecords).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBmiRecord = z.infer<typeof insertBmiRecordSchema>;
export type BmiRecord = typeof bmiRecords.$inferSelect;
