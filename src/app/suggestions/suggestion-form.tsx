"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { submitSuggestion } from "../actions/suggestions";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function SuggestionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await submitSuggestion(formData);
    setIsSubmitting(false);

    if (result.error) {
      toast(result.error);
    } else {
      toast("Your suggestion has been submitted!");
    }

    // Reset the form
    formData.set("suggestion", "");
    formData.set("author", "");
  }

  return (
    <div className="bg-purple-800/50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Submit Your Idea</h2>
      <form action={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="suggestion"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Your Suggestion
            </label>
            <Textarea
              id="suggestion"
              name="suggestion"
              placeholder="Describe your feature idea..."
              required
              className="w-full bg-purple-700/50 text-white placeholder-purple-300"
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Your Name
            </label>
            <Input
              type="text"
              id="author"
              name="author"
              placeholder="Enter your name or username"
              required
              className="w-full bg-purple-700/50 text-white placeholder-purple-300"
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
