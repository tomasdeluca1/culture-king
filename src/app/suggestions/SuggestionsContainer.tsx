"use client";

import { useState, useEffect } from "react";
import SuggestionsList from "./suggestion-list";
import SuggestionForm from "./suggestion-form";
import axios from "axios";
import toast from "react-hot-toast";

interface Suggestion {
  _id: string;
  text: string;
  votes: number;
  voters: string[];
  author: string;
  picture: string;
  createdAt: string;
}

export function SuggestionsContainer() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchSuggestions() {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Suggestion[]>("/api/suggestions");
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast.error("Failed to fetch suggestions");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <SuggestionForm onSuggestionAdded={fetchSuggestions} />
      <SuggestionsList
        suggestions={suggestions}
        isLoading={isLoading}
        onVoteSuccess={fetchSuggestions}
      />
    </div>
  );
}
