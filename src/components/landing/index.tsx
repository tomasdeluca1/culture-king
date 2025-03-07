"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Clock,
  Users,
  Crown,
  ArrowRight,
  Calendar,
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

export default function Landing() {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Simulate countdown to next daily reset
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const difference = midnight.getTime() - now.getTime();

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    setCountdown(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  // Mock leaderboard data
  const leaderboardData = {
    daily: [
      {
        name: "Alex",
        score: 5,
        time: "00:42",
        avatar: "/placeholder.webp",
      },
      {
        name: "Jamie",
        score: 5,
        time: "00:51",
        avatar: "/placeholder.webp",
      },
      {
        name: "Taylor",
        score: 5,
        time: "01:03",
        avatar: "/placeholder.webp",
      },
      {
        name: "Jordan",
        score: 4,
        time: "00:38",
        avatar: "/placeholder.webp",
      },
      {
        name: "Casey",
        score: 4,
        time: "00:45",
        avatar: "/placeholder.webp",
      },
    ],
    weekly: [
      {
        name: "Morgan",
        score: 35,
        time: "05:12",
        avatar: "/placeholder.webp",
      },
      {
        name: "Alex",
        score: 34,
        time: "05:30",
        avatar: "/placeholder.webp",
      },
      {
        name: "Riley",
        score: 33,
        time: "04:58",
        avatar: "/placeholder.webp",
      },
      {
        name: "Taylor",
        score: 32,
        time: "05:45",
        avatar: "/placeholder.webp",
      },
      {
        name: "Jamie",
        score: 30,
        time: "04:22",
        avatar: "/placeholder.webp",
      },
    ],
    monthly: [
      {
        name: "Riley",
        score: 142,
        time: "22:15",
        avatar: "/placeholder.webp",
      },
      {
        name: "Morgan",
        score: 138,
        time: "23:42",
        avatar: "/placeholder.webp",
      },
      {
        name: "Casey",
        score: 135,
        time: "21:37",
        avatar: "/placeholder.webp",
      },
      {
        name: "Alex",
        score: 129,
        time: "20:18",
        avatar: "/placeholder.webp",
      },
      {
        name: "Jordan",
        score: 125,
        time: "19:54",
        avatar: "/placeholder.webp",
      },
    ],
  };

  // Scroll to section if pathname matches an id
  useEffect(() => {
    const handleScrollToSection = () => {
      const sectionId = window.location.hash.replace("#", "");
      if (sectionId) {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (window.location.hash) {
      handleScrollToSection();
    }

    window.addEventListener("hashchange", handleScrollToSection);

    return () => {
      window.removeEventListener("hashchange", handleScrollToSection);
    };
  }, []);

  return (
    <main>
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
              onClick={() => (window.location.href = "/daily")}
            >
              Play Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white hover:bg-white/10 text-lg"
            >
              Learn More
            </Button>
          </div>

          <div className="flex items-center gap-2 text-purple-200">
            <Users className="h-5 w-5" />
            <span>
              Join <span className="font-bold text-white">2,500+</span> players
              competing right now
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
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    1
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.webp"
                      alt="Top player"
                      className="rounded-full w-8 h-8"
                    />
                    <span className="font-semibold">Alex</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>5/5</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-purple-300 mr-1" />
                    <span>00:42</span>
                  </div>
                  <Crown className="h-5 w-5 text-yellow-400" />
                </div>
              </div>

              <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black">
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
            >
              Start Playing Now
            </Button>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview Section */}
      <section id="leaderboards" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-700 text-white px-4 py-1 text-sm">
              Competition
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Leaderboards
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              See who's currently ruling the Culture Kingdom. Will you be next
              to wear the crown?
            </p>
          </div>

          <Tabs defaultValue="daily" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8 p-1 bg-base-100 rounded-lg shadow-lg gap-2">
              <TabsTrigger
                value="daily"
                className="data-[state=active]:bg-gradient-to-b data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black text-base-content flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-yellow-400"
              >
                <Calendar className="mr-2 h-4 w-4" /> Daily
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                className="data-[state=active]:bg-gradient-to-b data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black text-base-content flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-yellow-400"
              >
                <Calendar className="mr-2 h-4 w-4" /> Weekly
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-gradient-to-b data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-400 data-[state=active]:text-black text-base-content flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-yellow-400"
              >
                <Calendar className="mr-2 h-4 w-4" /> Monthly
              </TabsTrigger>
            </TabsList>

            {Object.entries(leaderboardData).map(([period, data]) => (
              <TabsContent key={period} value={period}>
                <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {data.map((player, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 rounded-lg bg-purple-800/30 border border-purple-700/30"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`font-bold rounded-full w-8 h-8 flex items-center justify-center ${
                                index === 0
                                  ? "bg-yellow-500 text-black"
                                  : index === 1
                                  ? "bg-gray-300 text-gray-800"
                                  : index === 2
                                  ? "bg-amber-700 text-amber-100"
                                  : "bg-purple-700"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="flex items-center gap-2">
                              <img
                                src={player.avatar || "/placeholder.webp"}
                                alt={player.name}
                                className="rounded-full w-8 h-8"
                              />
                              <span className="font-semibold">
                                {player.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span>{player.score}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-purple-300 mr-1" />
                              <span>{player.time}</span>
                            </div>
                            {index === 0 && (
                              <Crown className="h-5 w-5 text-yellow-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-black"
            >
              Join the Competition
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">
                  Weekly Development Updates
                </h3>
                <p className="text-purple-200 mb-4">
                  Follow our progress as we build and improve Culture King based
                  on player feedback and data.
                </p>
                <Button
                  variant="outline"
                  className="border-white hover:bg-white/10"
                  onClick={() => {
                    window.open("https://www.x.com/culturek1ng", "_blank");
                  }}
                >
                  Follow Our Build Journey
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Suggest New Features</h3>
                <p className="text-purple-200 mb-4">
                  Have ideas for new question categories or game mechanics?
                  We're all ears!
                </p>
                <Button
                  variant="outline"
                  className="border-white hover:bg-white/10"
                >
                  Submit Your Ideas
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">What Players Are Saying</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-purple-200 mb-4">
                    "I'm addicted to checking the leaderboard every day. The
                    competition is fierce but friendly!"
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.webp"
                      alt="User"
                      className="rounded-full w-8 h-8"
                    />
                    <span className="font-semibold">@indiemaker</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-purple-200 mb-4">
                    "Love watching this game evolve in public. The transparency
                    from the creators is refreshing."
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.webp"
                      alt="User"
                      className="rounded-full w-8 h-8"
                    />
                    <span className="font-semibold">@buildinpublic</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/40 border-purple-700/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-purple-200 mb-4">
                    "I've learned so much about culture while having fun. The
                    time pressure makes it exciting!"
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.webp"
                      alt="User"
                      className="rounded-full w-8 h-8"
                    />
                    <span className="font-semibold">@culturefan</span>
                  </div>
                </CardContent>
              </Card>
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
              onClick={() => (window.location.href = "/daily-challenge")}
            >
              Play Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-purple-200">
              No registration required. Just play and compete!
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
