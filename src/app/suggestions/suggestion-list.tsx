"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { motion } from "framer-motion";
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

interface SuggestionsListProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  onVoteSuccess: () => void;
}

export default function SuggestionsList({
  suggestions,
  isLoading,
  onVoteSuccess,
}: SuggestionsListProps) {
  const { user } = useUser();

  async function handleVote(id: string) {
    if (!user) {
      toast.error("Please sign in to vote");
      return;
    }

    try {
      await axios.post(`/api/suggestions/${id}/vote`);
      onVoteSuccess();
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to vote");
    }
  }

  if (isLoading) {
    return (
      <div className="bg-purple-800/50 p-6 rounded-lg shadow-lg flex justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-purple-800/50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Community Suggestions</h2>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-purple-700/50 p-4 rounded-lg flex items-start gap-4"
          >
            <Button
              onClick={() => handleVote(suggestion._id)}
              className={`flex-shrink-0 ${
                user && suggestion.voters.includes(user.sub || "")
                  ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
              size="sm"
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              {suggestion.votes}
            </Button>
            <div className="flex-grow">
              <p className="text-lg font-medium mb-2">{suggestion.text}</p>
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <Image
                  src={suggestion.picture}
                  alt={suggestion.author}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>
                  Suggested by {suggestion.author} •{" "}
                  {new Date(suggestion.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {suggestions.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No suggestions yet. Be the first to suggest a feature!
          </div>
        )}
      </div>
    </div>
  );
}
