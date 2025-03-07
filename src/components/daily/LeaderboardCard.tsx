"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const { data } = await axios.get<LeaderboardEntry[]>(
          "/api/daily-leaderboard"
        );
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today&#39;s Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-32">
            <span className="text-sm">Loading leaderboard...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&#39;s Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((entry, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Badge
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-300"
                        : index === 2
                        ? "bg-amber-600"
                        : "bg-white/10"
                    } text-black font-bold`}
                  >
                    {index + 1}
                  </Badge>
                  <Image
                    src={entry.picture || ""}
                    alt={entry.name || "User image"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-medium">{entry.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{entry.score}</div>
                  <div className="text-xs text-gray-400">
                    {(entry.timeTaken / 1000).toFixed(2)}s
                  </div>
                </div>
              </motion.div>
            );
          })}

          {leaderboard.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No scores yet today. Be the first to play!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
