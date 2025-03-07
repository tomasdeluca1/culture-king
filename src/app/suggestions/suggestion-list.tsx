"use client";

import { useState, useEffect } from "react";
import { getSuggestions, upvoteSuggestion } from "@/app/actions/suggestions";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

type Suggestion = {
  id: number;
  text: string;
  votes: number;
  author: string;
};

export default function SuggestionsList() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  async function fetchSuggestions() {
    setIsLoading(true);
    const fetchedSuggestions = await getSuggestions();
    setSuggestions(fetchedSuggestions);
    setIsLoading(false);
  }

  async function handleUpvote(id: number) {
    await upvoteSuggestion(id);
    fetchSuggestions();
  }

  if (isLoading) {
    return <div className="text-center">Loading suggestions...</div>;
  }

  return (
    <div className="bg-purple-800/50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Community Suggestions</h2>
      <ul className="space-y-4">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="bg-purple-700/50 p-4 rounded-lg flex items-start"
          >
            <Button
              onClick={() => handleUpvote(suggestion.id)}
              className="mr-4 bg-indigo-600 hover:bg-indigo-500"
              size="sm"
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              {suggestion.votes}
            </Button>
            <div>
              <p className="text-lg font-medium">{suggestion.text}</p>
              <p className="text-sm text-purple-300">
                Suggested by {suggestion.author}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
