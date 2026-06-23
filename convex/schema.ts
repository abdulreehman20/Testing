import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    externalId: v.string(),
    email: v.optional(v.string()),
  }).index("byExternalId", ["externalId"]),
});
