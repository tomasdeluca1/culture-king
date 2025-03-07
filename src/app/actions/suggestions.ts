"use server";

import { revalidatePath } from "next/cache";

// This would typically be in a database
const suggestions = [
  {
    id: 1,
    text: "Add a 'Culture Clash' mode for head-to-head battles",
    votes: 15,
    author: "culturefan23",
  },
  {
    id: 2,
    text: "Implement a 'Daily Streak' feature for consistent players",
    votes: 10,
    author: "gamedev101",
  },
  {
    id: 3,
    text: "Create themed weeks focusing on specific cultural areas",
    votes: 8,
    author: "historyBuff",
  },
];

export async function submitSuggestion(formData: FormData) {
  const text = formData.get("suggestion") as string;
  const author = formData.get("author") as string;

  if (!text || !author) {
    return { error: "Suggestion and author name are required" };
  }

  const newSuggestion = {
    id: suggestions.length + 1,
    text,
    votes: 0,
    author,
  };

  suggestions.push(newSuggestion);
  revalidatePath("/suggestions");
  return { success: true };
}

export async function upvoteSuggestion(id: number) {
  const suggestion = suggestions.find((s) => s.id === id);
  if (suggestion) {
    suggestion.votes += 1;
    revalidatePath("/suggestions");
    return { success: true };
  }
  return { error: "Suggestion not found" };
}

export async function getSuggestions() {
  // Sort suggestions by votes in descending order
  return suggestions.sort((a, b) => b.votes - a.votes);
}
