"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Loader2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { StatsCard } from "@/components/stats/StatsCard";

interface LeaderboardEntry {
  userId: string;
  name: string;
  picture: string;
  score: number;
  correctAnswers: number;
  timeTaken: number;
  date: string;
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("daily");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setIsLoading(true);
        const { data } = await axios.get<LeaderboardEntry[]>(
          `/api/leaderboards?period=${period}`
        );
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, [period]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Culture King Leaderboards</h1>
          <p className="text-gray-300">
            Compete with players worldwide and claim your crown!
          </p>
        </div>

        <Tabs defaultValue="daily" onValueChange={setPeriod}>
          <TabsList className="grid grid-cols-3 max-w-[400px] mx-auto mb-8">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          {["daily", "monthly", "yearly"].map((tabPeriod) => (
            <TabsContent key={tabPeriod} value={tabPeriod}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Crown className="h-6 w-6 text-yellow-500" />
                      {tabPeriod.charAt(0).toUpperCase() +
                        tabPeriod.slice(1)}{" "}
                      Rankings
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {leaderboard.map((entry, index) => (
                        <motion.div
                          key={`${entry.userId}-${entry.date}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
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
                              src={entry.picture}
                              alt={entry.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div>
                              <div className="font-medium">{entry.name}</div>
                              <div className="text-xs text-gray-400">
                                {new Date(entry.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-xs text-gray-400">Score</div>
                              <div className="font-bold text-yellow-500">
                                {entry.score}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-400">
                                Correct
                              </div>
                              <div className="font-bold text-green-500">
                                {entry.correctAnswers}/5
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-400">Time</div>
                              <div className="font-bold text-blue-500">
                                {(entry.timeTaken / 1000).toFixed(2)}s
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {leaderboard.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          No scores yet for this period.
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8">
          <StatsCard />
        </div>
      </div>
    </div>
  );
}
