import type { Metadata } from "next";
import { SuggestionsContainer } from "./SuggestionsContainer";

export const metadata: Metadata = {
  title: "Suggest New Features | Culture King",
  description:
    "Suggest new features for Culture King and vote on community ideas.",
};

export default function SuggestionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-left">
          Suggest New Features
        </h1>
        <SuggestionsContainer />
      </main>
    </div>
  );
}
