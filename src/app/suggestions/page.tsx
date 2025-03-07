import type { Metadata } from "next";
import SuggestionsList from "./suggestion-list";
import SuggestionForm from "./suggestion-form";

export const metadata: Metadata = {
  title: "Suggest New Features | Culture King",
  description:
    "Suggest new features for Culture King and vote on community ideas.",
};

export default function SuggestionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Suggest New Features
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <SuggestionForm />
          <SuggestionsList />
        </div>
      </main>
    </div>
  );
}
