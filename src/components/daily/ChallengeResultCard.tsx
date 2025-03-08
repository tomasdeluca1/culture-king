"use client";

import { motion } from "framer-motion";
import JSConfetti from "js-confetti";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Clock, Target, Crown, Share2 } from "lucide-react";

interface ChallengeResultCardProps {
  score: number;
  rank: number | null;
  correctAnswers: number;
  timeTaken: number;
}

export function ChallengeResultCard({
  score,
  rank,
  correctAnswers,
  timeTaken,
}: ChallengeResultCardProps) {
  useEffect(() => {
    if (rank && rank <= 3) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ["👑", "⭐", "🏆"],
        emojiSize: 30,
        confettiNumber: 50,
      });
    }
  }, [rank]);

  const handleShare = () => {
    const formattedTime = (timeTaken / 1000).toFixed(1);
    const rankMessage = rank && rank <= 3 ? `🔥 Ranked #${rank} today!` : "";

    const text = [
      `I scored ${score} points (${correctAnswers}/5) in ${formattedTime}s on Culture King!`,
      "",
      rankMessage,
      "",
      "Can you beat my score? 👑",
    ]
      .filter(Boolean)
      .join("\n");

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(
      "https://culture-king.vercel.app"
    )}&via=culturek1ng`;

    window.open(tweetUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-purple-600">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            {rank && rank <= 3 ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="mb-4"
                >
                  <Crown className="h-16 w-16 text-yellow-400 mx-auto" />
                </motion.div>
                <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text">
                  {rank === 1
                    ? "New Champion!"
                    : rank === 2
                    ? "Silver Trophy!"
                    : "Bronze Trophy!"}
                </h2>
                <p className="text-purple-300 text-lg">
                  You've made it to the leaderboard!
                </p>
              </>
            ) : (
              <>
                <Target className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Challenge Complete!</h2>
                <p className="text-purple-300">
                  Great effort! Keep practicing to reach the top.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-900/50 p-4 rounded-lg text-center shadow-md">
              <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-sm text-purple-200">Score</div>
              <div className="text-3xl font-bold">{score}</div>
            </div>
            <div className="bg-purple-900/50 p-4 rounded-lg text-center shadow-md">
              <Target className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm text-purple-200">Correct</div>
              <div className="text-3xl font-bold">{correctAnswers}/5</div>
            </div>
            <div className="bg-purple-900/50 p-4 rounded-lg text-center shadow-md col-span-2 md:col-span-1">
              <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm text-purple-200">Time</div>
              <div className="text-3xl font-bold">
                {(timeTaken / 1000).toFixed(1)}s
              </div>
            </div>
          </div>

          {rank && (
            <div className="text-center mb-8">
              <Badge className="bg-purple-800/50 text-white px-4 py-2 text-lg">
                Rank #{rank} Today
              </Badge>
            </div>
          )}

          <button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <Share2 className="h-5 w-5" />
            Share on X
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
