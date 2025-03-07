/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Clock, Target } from "lucide-react";
import Link from "next/link";

interface CompletedChallengeProps {
  userGameScore: any;
  rank: number | null;
  timeTaken: number;
}

export function CompletedChallengeCard({
  userGameScore,
  rank,
}: CompletedChallengeProps) {
  const handleShareScore = () => {
    const text = `I scored ${userGameScore.score} points (${
      userGameScore.correctAnswers
    }/5) in ${(userGameScore.timeTaken / 1000).toFixed(2)}s on Culture King!${
      rank && rank <= 3 ? ` (Ranked #${rank} today!) 🏆` : ""
    }`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent("https://culture-king.vercel.app")}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              Today's Challenge Completed!
            </div>
            {rank && (
              <Badge
                className={`px-4 py-2 text-lg ${
                  rank === 1
                    ? "bg-yellow-500"
                    : rank === 2
                    ? "bg-gray-300"
                    : rank === 3
                    ? "bg-amber-600"
                    : "bg-purple-600"
                } text-black inline-flex items-center gap-2 hover:scale-105 transition-transform transform`}
              >
                <Crown className="h-5 w-5" />
                {rank === 1
                  ? "Today's Culture King! 👑"
                  : rank === 2
                  ? "Silver Champion! 🥈"
                  : rank === 3
                  ? "Bronze Warrior! 🥉"
                  : `Rank #${rank}`}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center">
              <Target className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-sm text-gray-400">Correct Answers</span>
              <span className="text-2xl font-bold text-green-500">
                {userGameScore.correctAnswers}/5
              </span>
            </div>

            <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center">
              <Clock className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm text-gray-400">Time Taken</span>
              <span className="text-2xl font-bold text-blue-500">
                {(userGameScore.timeTaken / 1000).toFixed(2)}s
              </span>
            </div>

            <div className="bg-white/5 p-4 rounded-lg flex flex-col items-center">
              <Crown className="h-8 w-8 text-yellow-500 mb-2" />
              <span className="text-sm text-gray-400">Final Score</span>
              <span className="text-2xl font-bold text-yellow-500">
                {userGameScore.score}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Link href="/leaderboard" className="btn btn-primary b0rder-0">
              View Leaderboard
            </Link>
            <button className="btn btn-secondary" onClick={handleShareScore}>
              Share Score
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
