import { users, bmiRecords, type User, type InsertUser, type BmiRecord, type InsertBmiRecord } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBmiRecord(bmiRecord: InsertBmiRecord): Promise<BmiRecord>;
  getBmiRecordsByUserId(userId: number): Promise<BmiRecord[]>;
  getAllBmiRecords(): Promise<BmiRecord[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createBmiRecord(insertBmiRecord: InsertBmiRecord): Promise<BmiRecord> {
    const [bmiRecord] = await db
      .insert(bmiRecords)
      .values(insertBmiRecord)
      .returning();
    return bmiRecord;
  }

  async getBmiRecordsByUserId(userId: number): Promise<BmiRecord[]> {
    return await db
      .select()
      .from(bmiRecords)
      .where(eq(bmiRecords.userId, userId))
      .orderBy(desc(bmiRecords.createdAt));
  }

  async getAllBmiRecords(): Promise<BmiRecord[]> {
    return await db
      .select()
      .from(bmiRecords)
      .orderBy(desc(bmiRecords.createdAt));
  }
}

export const storage = new DatabaseStorage();
