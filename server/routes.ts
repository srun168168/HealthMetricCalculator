import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBmiRecordSchema, type BmiRecord } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // BMI Records API routes
  
  // Get all BMI records
  app.get("/api/bmi-records", async (req, res) => {
    try {
      const records = await storage.getAllBmiRecords();
      res.json(records);
    } catch (error) {
      console.error("Error fetching BMI records:", error);
      res.status(500).json({ error: "Failed to fetch BMI records" });
    }
  });

  // Create a new BMI record
  app.post("/api/bmi-records", async (req, res) => {
    try {
      const validatedData = insertBmiRecordSchema.parse(req.body);
      const newRecord = await storage.createBmiRecord(validatedData);
      res.status(201).json(newRecord);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        console.error("Error creating BMI record:", error);
        res.status(500).json({ error: "Failed to create BMI record" });
      }
    }
  });

  // Get BMI records for a specific user
  app.get("/api/users/:userId/bmi-records", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const records = await storage.getBmiRecordsByUserId(userId);
      res.json(records);
    } catch (error) {
      console.error("Error fetching user BMI records:", error);
      res.status(500).json({ error: "Failed to fetch user BMI records" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
