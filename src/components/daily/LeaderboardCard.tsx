"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  userId: string;
  name: string;
  picture: string;
  score: number;
  correctAnswers: number;
  timeTaken: number;
  date: string;
}

export function LeaderboardCard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get<LeaderboardEntry[]>(
        `/api/daily-leaderboard?t=${Date.now()}`
      );
      setLeaderboard(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load leaderboard";
      setError(message);
      toast.error("Error loading leaderboard");
      console.error("Error fetching leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Refresh every minute
    const interval = setInterval(fetchLeaderboard, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white/5 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Today's Top 5
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-purple-300" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          Today's Top 5
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {error ? (
            <div className="text-center py-6 text-red-400">
              <p>{error}</p>
              <button
                onClick={fetchLeaderboard}
                className="mt-3 text-sm text-purple-400 hover:text-purple-300"
              >
                Try Again
              </button>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-6 text-purple-200">
              No scores yet today. Be the first to play!
            </div>
          ) : (
            leaderboard.map((entry, index) => (
              <motion.div
                key={entry.userId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-purple-900/30 rounded-lg border border-purple-700/30"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Badge
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-full text-black font-bold",
                      index === 0 && "bg-yellow-500",
                      index === 1 && "bg-gray-300",
                      index === 2 && "bg-amber-600",
                      index > 2 && "bg-white/20 text-white"
                    )}
                  >
                    {index + 1}
                  </Badge>
                  <Image
                    src={entry.picture}
                    alt={entry.name}
                    width={32}
                    height={32}
                    className="rounded-full ring-2 ring-purple-500/30"
                  />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{entry.name}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(entry.date).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Score</div>
                    <div className="font-bold text-yellow-500">
                      {entry.score}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Correct</div>
                    <div className="font-bold text-green-500">
                      {entry.correctAnswers}/5
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Time</div>
                    <div className="font-bold text-blue-500">
                      {(entry.timeTaken / 1000).toFixed(1)}s
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
