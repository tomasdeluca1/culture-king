"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function SuggestionForm({
  onSuggestionAdded,
}: {
  onSuggestionAdded: () => void;
}) {
  const { user, isLoading } = useUser();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await axios.post("/api/suggestions", { text });
      setText("");
      toast.success("Suggestion submitted successfully!");
      onSuggestionAdded();
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      toast.error("Failed to submit suggestion");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return null;

  if (!user) {
    return (
      <div className="bg-purple-800/50 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Submit Your Idea</h2>
        <p className="text-purple-200 mb-4">
          Please sign in to submit suggestions and vote.
        </p>
        <a
          href="/api/auth/login"
          className="btn btn-primary bg-yellow-500 hover:bg-yellow-400 text-black"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="bg-purple-800/50 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex items-center mb-6">
            <Image
              src={user.picture?.replace("_normal", "") || "/x-image.png"}
              alt={user.name || "User"}
              width={50}
              height={50}
              className="rounded-full border-2 border-yellow-500 shadow-lg mr-3"
            />
            <span className="text-gray-300 font-semibold text-lg">
              {user.name}
            </span>
          </div>
          <div>
            <label
              htmlFor="suggestion"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Your Suggestion
            </label>
            <Textarea
              id="suggestion"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe your feature idea..."
              required
              className="w-full bg-purple-800 text-white placeholder-purple-400 border border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
          >
            {isSubmitting ? "Submitting..." : "Submit Suggestion"}
          </Button>
        </div>
      </form>
    </div>
  );
}
