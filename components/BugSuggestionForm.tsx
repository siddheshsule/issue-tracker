"use client";
import { Issue } from "@prisma/client";
import { useState } from "react";
import { Button } from "./ui/button";

const BugSuggestionForm = ({ issue }: { issue: Issue }) => {
  const [generation, setGeneration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevents the default form submission behavior
    setIsLoading(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: issue.description,
        }),
      });

      const json = await response.json();
      setGeneration(json.text);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Button
          className="bg-sky-600 text-black"
          type="submit"
          // disabled={isLoading}
          disabled
        >
          {isLoading ? "Loading..." : "Get AI Suggestion"}
        </Button>
      </form>
      <div>
        <h2>Suggested Solution:</h2>
        <p>{generation}</p>
      </div>
    </div>
  );
};

export default BugSuggestionForm;
