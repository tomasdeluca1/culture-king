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
  name: string;
  picture: string;
  score: number;
  timeTaken: number;
  rank: number;
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
        "/api/daily-leaderboard"
      );
      // Only take the top 5 entries
      setLeaderboard(data.slice(0, 3));
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
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white/5 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Today's Top 3
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
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-purple-900/30 rounded-lg border border-purple-700/30"
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
                    src={entry.picture || ""}
                    alt={entry.name || "User image"}
                    width={32}
                    height={32}
                    className="rounded-full ring-2 ring-purple-500/30"
                  />
                  <span className="font-medium text-purple-50">
                    {entry.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-500">{entry.score}</div>
                  <div className="text-xs text-purple-300">
                    {(entry.timeTaken / 1000).toFixed(1)}s
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
