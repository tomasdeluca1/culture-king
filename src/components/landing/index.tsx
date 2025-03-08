/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Clock,
  Users,
  Crown,
  ArrowRight,
  Star,
  Zap,
  Brain,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import { getTimeUntilReset } from "@/lib/utils/time";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface LeaderboardPlayer {
  userId: string;
  name: string;
  picture: string;
  score: number;
  correctAnswers: number;
  timeTaken: number;
  date: string;
}

interface LeaderboardData {
  daily: LeaderboardPlayer[];
  monthly: LeaderboardPlayer[];
  yearly: LeaderboardPlayer[];
}

export default function Landing() {
  const [countdown, setCountdown] = useState(getTimeUntilReset());
  const [stats, setStats] = useState<any>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
    daily: [],
    monthly: [],
    yearly: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

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

  async function fetchLeaderboard() {
    try {
      const [dailyData, monthlyData, yearlyData] = await Promise.all([
        axios.get("/api/leaderboards?period=daily"),
        axios.get("/api/leaderboards?period=monthly"),
        axios.get("/api/leaderboards?period=yearly"),
      ]);

      setLeaderboardData({
        daily: dailyData.data || [],
        monthly: monthlyData.data || [],
        yearly: yearlyData.data || [],
      });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Failed to fetch leaderboard data");
    }
  }
  useEffect(() => {
    fetchStats();
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = getTimeUntilReset();
      setCountdown(timeLeft);

      // Optional: Refresh page at reset time
      if (timeLeft.total <= 0) {
        window.location.reload();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== "undefined") {
        const sectionId = window.location.hash.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
          const offset = 200 + 64; // Adjusted offset for smoother scrolling, adding margin for fixed nav height
          const top =
            section.getBoundingClientRect().top + window.scrollY - offset; // Use window.scrollY for accurate position
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  const handlePlayNow = () => {
    router.push("/daily");
  };

  const handleSuggestions = () => {
    router.push("/suggestions");
  };

  if (isLoading) {
    return (
      <div className="min-h-[700px] flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <Badge className="bg-purple-700 text-white px-4 py-1 text-sm">
            Built in Public
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Claim Your Spot at the Top with{" "}
            <span className="text-yellow-400">Culture King</span>{" "}
            <Crown className="inline h-10 w-10 text-yellow-400" />
          </h1>
          <p className="text-xl text-purple-100">
            Test your cultural knowledge, race against the clock, and compete
            for the crown in daily, weekly, and monthly leaderboards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black text-lg"
              onClick={handlePlayNow}
            >
              Play Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://x.com/culturek1ng", "_blank")}
            >
              Learn More
            </Button>
          </div>

          <div className="flex items-center gap-2 text-purple-200">
            <Users className="h-5 w-5" />
            <span>
              Join{" "}
              <span className="font-bold text-white">
                {stats?.totalPlayers}+
              </span>{" "}
              players competing right now
            </span>
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full filter blur-3xl opacity-20"></div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 bg-gradient-to-br from-purple-800/80 to-indigo-800/80 p-6 rounded-2xl border border-purple-700/50 backdrop-blur-sm shadow-xl"
          >
            <div className="absolute -top-3 -right-3">
              <Badge className="bg-yellow-500 text-black font-bold px-3 py-1">
                <Clock className="mr-1 h-4 w-4" /> Daily Challenge
              </Badge>
            </div>

            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold mb-2">Next Reset In:</h3>
              <div className="flex justify-center gap-4 text-2xl font-mono">
                <div className="bg-purple-950/50 px-3 py-2 rounded-lg">
                  {String(countdown.hours).padStart(2, "0")}
                </div>
                <span className="self-center">:</span>
                <div className="bg-purple-950/50 px-3 py-2 rounded-lg">
                  {String(countdown.minutes).padStart(2, "0")}
                </div>
                <span className="self-center">:</span>
                <div className="bg-purple-950/50 px-3 py-2 rounded-lg">
                  {String(countdown.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {leaderboardData.daily && leaderboardData.daily.length > 0 ? (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      1
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        width={32}
                        height={32}
                        src={
                          leaderboardData.daily[0].picture || "/placeholder.png"
                        }
                        alt="Top player"
                        className="rounded-full w-8 h-8"
                      />
                      <span className="font-semibold">
                        {leaderboardData.daily[0].name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{leaderboardData.daily[0].correctAnswers}/5</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-purple-300 mr-1" />
                      <span>
                        {(leaderboardData.daily[0].timeTaken / 1000).toFixed(2)}
                        s
                      </span>
                    </div>
                    <Crown className="h-5 w-5 text-yellow-400" />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <p className="text-purple-200 text-lg">
                    Be the first to score and claim your spot on the
                    leaderboard!
                  </p>
                </div>
              )}

              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
                onClick={handlePlayNow}
              >
                Take Today's Challenge
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="py-20 bg-indigo-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-indigo-700 text-white px-4 py-1 text-sm">
              Game Rules
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How to Become the Culture King
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Answer 5 culture questions correctly in the fastest time to claim
              your spot at the top of the leaderboard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-800 w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-purple-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">Answer 5 Questions</h3>
                <p className="text-purple-200">
                  Test your knowledge on pop culture, history, art, music, and
                  current events with our daily rotating questions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-800 w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">Race Against Time</h3>
                <p className="text-purple-200">
                  Your score is based on correct answers and completion time.
                  The faster you answer correctly, the higher you rank.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="rounded-full bg-purple-800 w-12 h-12 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-purple-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Climb the Leaderboard
                </h3>
                <p className="text-purple-200">
                  Compete for the top spot on daily, weekly, and monthly
                  leaderboards. Consistency is key to long-term dominance.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black"
              onClick={handlePlayNow}
            >
              Start Playing Now
            </Button>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-20" id="leaderboards">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-indigo-700 text-white px-4 py-1 text-sm">
              Leaderboard
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Players</h2>
            <p className="text-purple-200">
              Compete with the best and claim your spot on the leaderboard
            </p>
          </div>

          <Tabs defaultValue="daily" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8 rounded-lg shadow-lg gap-2 mx-auto p-2 bg-gradient-to-r from-purple-900 to-purple-800 sborder border-purple-700/50 backdrop-blur-sm">
              {["Daily", "Monthly", "Yearly"].map((period) => (
                <TabsTrigger
                  key={period.toLowerCase()}
                  value={period.toLowerCase()}
                  className="hover:bg-purple-700 data-[state=active]:bg-gradient-to-b data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black transition-colors duration-200 text-white font-semibold py-2 rounded-lg"
                >
                  {period}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(leaderboardData).map(([period, players]) => (
              <TabsContent key={period} value={period}>
                <Card className="bg-purple-900/50 border-purple-700/50 backdrop-blur-sm shadow-lg">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {players
                        .slice(0, 5)
                        .map((player: LeaderboardPlayer, index: number) => (
                          <motion.div
                            key={`${player.userId}-${player.date}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex justify-between items-center p-4 rounded-lg bg-purple-800/40 border border-purple-600/30 shadow-md"
                          >
                            <div className="flex items-center gap-3">
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
                                src={player.picture || "/app/favicon.ico"}
                                alt={player.name}
                                width={40}
                                height={40}
                                className="rounded-full border-2 border-white"
                              />
                              <span className="font-semibold text-lg text-white">
                                {player.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-sm text-white">
                                  {player.correctAnswers}/5
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-purple-300 mr-1" />
                                <span className="text-sm text-white">
                                  {(player.timeTaken / 1000).toFixed(2)}s
                                </span>
                              </div>
                              {index === 0 && (
                                <Crown className="h-5 w-5 text-yellow-400" />
                              )}
                            </div>
                          </motion.div>
                        ))}

                      {players.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          No scores yet for this period.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black"
              onClick={handlePlayNow}
            >
              Start Playing Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-indigo-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-indigo-700 text-white px-4 py-1 text-sm">
              Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Culture Kings Rule
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Our game is designed for indie hackers who love to learn, compete,
              and build in public.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Zap className="h-10 w-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Daily Challenges</h3>
                <p className="text-purple-200">
                  New questions every day to keep you coming back and testing
                  your knowledge.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Trophy className="h-10 w-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Multiple Leaderboards
                </h3>
                <p className="text-purple-200">
                  Compete on daily, weekly, and monthly boards to prove your
                  consistency.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Users className="h-10 w-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                <p className="text-purple-200">
                  Built in public with feedback from players shaping the game's
                  evolution.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Share2 className="h-10 w-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Share Your Wins</h3>
                <p className="text-purple-200">
                  Easily share your achievements on social media to challenge
                  friends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-700 text-white px-4 py-1 text-sm">
              Build in Public
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Join Our Kingdom
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Culture King is built in public by indie hackers for indie
              hackers. Follow our journey and help shape the game.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm transition-transform transform hover:scale-105">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Weekly Development Updates
                </h3>
                <p className="text-purple-200 mb-4">
                  Follow our progress as we build and improve Culture King based
                  on player feedback and data.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open("https://www.x.com/culturek1ng", "_blank");
                  }}
                >
                  Follow Our Journey
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm transition-transform transform hover:scale-105">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Suggest New Features
                </h3>
                <p className="text-purple-200 mb-4">
                  Have ideas for new question categories or game mechanics?
                  We're all ears!
                </p>
                <Button variant="outline" onClick={handleSuggestions}>
                  Submit Your Ideas
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">What Players Are Saying</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  quote:
                    "I'm addicted to checking the leaderboard every day. The competition is fierce but friendly!",
                  username: "@indiemaker",
                },
                {
                  quote:
                    "Love watching this game evolve in public. The transparency from the creators is refreshing.",
                  username: "@buildinpublic",
                },
                {
                  quote:
                    "I've learned so much about culture while having fun. The time pressure makes it exciting!",
                  username: "@culturefan",
                },
              ].map(({ quote, username }, index) => (
                <Card
                  key={index}
                  className="bg-purple-900/50 border border-purple-700/50 backdrop-blur-sm transition-transform transform hover:scale-105 shadow-lg"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-purple-200 mb-4 text-lg italic">
                      {quote}
                    </p>
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        width={32}
                        height={32}
                        src="/favicon.ico"
                        alt="User"
                        className="w-6 h-6"
                      />
                      <span className="font-semibold text-purple-100">
                        {username}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-800 to-indigo-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-2">
              <Crown className="inline-block h-16 w-16 text-yellow-400 mb-4" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Claim Your Crown?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of players competing to be the Culture King. New
              questions daily, weekly, and monthly leaderboards, and a chance to
              prove your cultural knowledge.
            </p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black text-lg px-8"
              onClick={handlePlayNow}
            >
              Play Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-purple-200">
              Sign in with Twitter or Google to play and compete!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
