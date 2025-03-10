/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Target, Activity } from "lucide-react";
import axios from "axios";

interface GameStats {
  totalPlayers: number;
  activePlayers: number;
  dailyPlayers: number;
  monthlyPlayers: number;
  yearlyPlayers: number;
  averageScore: number;
  topScore: number;
}

export function StatsCard() {
  const [stats, setStats] = useState<GameStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get<any>("/api/stats");
        setStats(response.data.gameStats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return null;
  }

  return (
    <Card className="transition-all duration-300 hover:bg-white/5 rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Game Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />,
              label: "Active Players",
              value: stats.activePlayers.toLocaleString(),
              color: "text-blue-500",
            },
            {
              icon: <Target className="h-6 w-6 text-green-500 mx-auto mb-2" />,
              label: "Today's Players",
              value: stats.dailyPlayers.toLocaleString(),
              color: "text-green-500",
            },
            {
              icon: <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />,
              label: "Top Score",
              value: stats.topScore.toLocaleString(),
              color: "text-yellow-500",
            },
            {
              icon: (
                <Activity className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              ),
              label: "Average Score",
              value: stats.averageScore.toLocaleString(),
              color: "text-purple-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-4 rounded-lg text-center transition-transform transform hover:scale-105"
            >
              {stat.icon}
              <div className="text-sm text-gray-400">{stat.label}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
