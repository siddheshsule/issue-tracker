import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { createBugSuggestionSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const prompt = await request.json();
  const validation = createBugSuggestionSchema.safeParse(prompt);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Generate the suggestion using the AI model
  const aiResponse = await generateText({
    model: openai("gpt-3.5-turbo"),
    system:
      "You are a very highly experienced and skilled engineer who knows the ins and outs of Embedded systems, software engineering, electronics engineering, mechanical, cybersecurity, AI, and project management." +
      "You will act like a problem solver and perform detailed analysis of the provided bug description and give suggestions on what may fix the bug." +
      "You are always straight to the point." +
      "Your replies are always under 500 characters.",
    prompt,
  });

  // Assuming aiResponse has a `text` property that holds the generated text
  const suggestionText = aiResponse.text; // Adjust this according to the actual response structure

  const newSuggestion = await prisma.bugSuggestion.create({
    data: { description: prompt.title, suggestion: suggestionText },
  });

  return NextResponse.json(newSuggestion, { status: 201 });
}
