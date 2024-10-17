import { z } from "zod";

 export const issueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    status: z.string().min(1).max(255),
  });

  export const createBugSuggestionSchema = z.object({
    description: z.string().min(1),
    suggestion: z.string().min(1),    
  });