"use client";

import { motion, AnimatePresence } from "framer-motion";
import JSConfetti from "js-confetti";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface GameOverModalProps {
  score: number;
  rank: number | null;
  timeTaken: number;
  onPlayAgain: () => void;
  onShare: () => void;
}

export function GameOverModal({
  score,
  rank,
  timeTaken,
  onPlayAgain,
  onShare,
}: GameOverModalProps) {
  useEffect(() => {
    if (rank && rank <= 3) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ["👑", "🏆", "⭐"],
        emojiSize: 50,
        confettiNumber: 100,
      });
    }
  }, [rank]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <Card className="w-full max-w-lg">
          <CardContent className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p className="text-lg">
                You scored {score} out of 5 in {(timeTaken / 1000).toFixed(2)}s
              </p>
              {rank && rank <= 3 && (
                <Badge className="bg-yellow-500 text-black px-4 py-2">
                  {rank === 1
                    ? "🥇 Top Score!"
                    : rank === 2
                    ? "🥈 Second Place!"
                    : "🥉 Third Place!"}
                </Badge>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onPlayAgain}
                className="btn btn-primary"
                disabled={true} // Disable until next day
              >
                Play Again Tomorrow
              </button>
              <button onClick={onShare} className="btn btn-secondary">
                Share Score
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
} 