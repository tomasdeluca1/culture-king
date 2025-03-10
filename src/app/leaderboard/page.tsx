"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Loader2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { StatsCard } from "@/components/stats/StatsCard";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  userId: string;
  name: string;
  picture: string;
  score?: number;
  totalScore?: number;
  correctAnswers?: number;
  timeTaken?: number;
  gamesPlayed?: number;
  date?: string;
  averageTime?: number;
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("daily");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get<LeaderboardEntry[]>(
        `/api/leaderboards?period=${period}`
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
  }, [period]);

  const renderStats = (entry: LeaderboardEntry) => {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        {period === "daily" && (
          <>
            <div className="text-center">
              <div className="text-xs text-gray-400">Score</div>
              <div className="font-bold text-yellow-500">{entry.score}</div>
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
                {(entry.timeTaken! / 1000).toFixed(1)}s
              </div>
            </div>
          </>
        )}
        {period !== "daily" && (
          <>
            <div className="text-center">
              <div className="text-xs text-gray-400">Total Score</div>
              <div className="font-bold text-yellow-500">
                {entry.totalScore}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">Games</div>
              <div className="font-bold text-purple-500">
                {entry.gamesPlayed}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">Avg Time</div>
              <div className="font-bold text-blue-500">
                {(entry.averageTime! / 1000).toFixed(1)}s
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Culture King Leaderboards
          </h1>
          <p className="text-gray-300">
            Compete with players worldwide and claim your crown!
          </p>
        </div>

        <Tabs defaultValue="daily" onValueChange={setPeriod}>
          <TabsList className="grid grid-cols-3 max-w-[400px] mx-auto mb-8">
            <TabsTrigger
              value="daily"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black p-2 bg-white/10"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black p-2 bg-white/10"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black p-2 bg-white/10"
            >
              Yearly
            </TabsTrigger>
          </TabsList>

          <Card className="bg-white/5 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  {period.charAt(0).toUpperCase() + period.slice(1)} Rankings
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-400">
                  <p>{error}</p>
                  <button
                    onClick={fetchLeaderboard}
                    className="mt-4 text-sm text-purple-400 hover:text-purple-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="text-center py-8 text-purple-300">
                  No entries yet for this period
                </div>
              ) : (
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <motion.div
                      key={`${entry.userId}-${entry.date || index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg",
                        "bg-gradient-to-r from-purple-900/30 to-indigo-900/30",
                        "border border-purple-700/30 hover:border-purple-600/50",
                        "transition-all duration-200"
                      )}
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
                          <div className="font-medium truncate">
                            {entry.name}
                          </div>
                          {entry.date && (
                            <div className="text-xs text-gray-400">
                              {new Date(entry.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      {renderStats(entry)}
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Tabs>

        <div className="mt-8">
          <StatsCard />
        </div>
      </div>
    </div>
  );
}
