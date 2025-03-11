"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Loader2 } from "lucide-react";

import { QuestionCard } from "@/components/daily/QuestionCard";
import { Question } from "@/types/game";
import { LeaderboardCard } from "@/components/daily/LeaderboardCard";
import { ChallengeResultCard } from "@/components/daily/ChallengeResultCard";

interface DailyChallengeResponse {
  hasPlayed: boolean;
  questions?: Question[];
  userGameScore?: { score: number; rank?: number } | null;
}

export default function CultureKing() {
  const { user, isLoading: userLoading } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userGameScore, setUserGameScore] = useState<{
    score: number;
    rank?: number;
    correctAnswers?: number;
    timeTaken?: number;
  } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [rank, setRank] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchDailyChallenge() {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get<DailyChallengeResponse>(
          "/api/daily-challenge"
        );
        if (response.data.hasPlayed) {
          setHasPlayed(true);
          setUserGameScore(response.data.userGameScore || null);
          setRank(response.data.userGameScore?.rank || null);
        } else if (response.data.questions) {
          setQuestions(response.data.questions);
          setCurrentQuestion(response.data.questions[0]);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load daily challenge";
        setError(message);
        toast.error("Error loading daily challenge");
        console.error("Error fetching daily challenge:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user && !userLoading) {
      fetchDailyChallenge();
    }
  }, [user, userLoading]);

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion || !startTime || isSubmitting) return;

    const isCorrect = currentQuestion.correct_answer === answer;
    const isLastQuestion = questions.length === 1;

    // Update the score immediately for user feedback
    if (isCorrect) {
      setUserGameScore((prev) => ({
        score: (prev?.score || 0) + 1,
        rank: prev?.rank,
      }));
    }

    // If this was the last question
    if (isLastQuestion) {
      setIsSubmitting(true); // Prevent double submissions
      const timeTaken = Date.now() - startTime;
      const correctAnswers = (userGameScore?.score || 0) + (isCorrect ? 1 : 0);

      // Calculate final score
      const maxTimeAllowed = 30000 * 5; // 30 seconds * 5 questions
      const timeBonus = Math.max(0, maxTimeAllowed - timeTaken) / 60; // Up to 500 points
      const finalScore = correctAnswers * 1000 + timeBonus;

      try {
        const response = await axios.post("/api/daily-challenge", {
          correctAnswers,
          timeTaken,
          score: Math.round(finalScore),
        });

        if (response.data) {
          setRank(response.data.rank);
          setUserGameScore({
            score: response.data.score,
            correctAnswers: response.data.correctAnswers,
            timeTaken: response.data.timeTaken,
          });
          setHasPlayed(true);
          setStartTime(null);
          toast.success("Challenge completed!");
        }
      } catch (error) {
        console.error("Error saving challenge result:", error);
        toast.error("Failed to save your score");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Move to next question
      setCurrentQuestion(questions[1]);
      setQuestions((prev) => prev.slice(1));
    }
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    setStartTime(Date.now());
    setElapsedTime(0); // Reset elapsed time when starting the timer
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime!);
      }, 100); // Update every 100 milliseconds
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, startTime]);

  if (user && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
          <p className="text-purple-200">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-red-300 hover:text-red-200 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-[70vh] p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-white mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Culture King
          </motion.h1>
          <motion.p
            className="text-lg text-purple-100 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join the daily knowledge competition to showcase your skills and
            compete with others!
          </motion.p>
          <motion.a
            href="/api/auth/login"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Login to Play
          </motion.a>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <Head>
        <title>Culture King - Daily Knowledge Competition</title>
        <meta
          name="description"
          content="Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!"
        />
        <meta
          name="keywords"
          content="Culture King, cultural knowledge, trivia, leaderboard, game"
        />
        <meta name="author" content="Your Name" />

        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Culture King" />
        <meta
          property="og:description"
          content="Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!"
        />
        <meta
          property="og:image"
          content="https://culture-king.vercel.app/og-image.png"
        />
        <meta property="og:url" content="https://culture-king.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Culture King" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Culture King Logo" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Culture King - Daily Knowledge Competition"
        />
        <meta
          name="twitter:description"
          content="Join thousands of players competing to be the Culture King. Test your cultural knowledge and race against the clock!"
        />
        <meta
          name="twitter:image"
          content="https://culture-king.vercel.app/og-image.png"
        />
        <meta name="twitter:url" content="https://culture-king.vercel.app" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {hasPlayed ? (
            <>
              <LeaderboardCard />
              <ChallengeResultCard
                score={userGameScore?.score || 0}
                rank={rank}
                correctAnswers={userGameScore?.correctAnswers || 0}
                timeTaken={userGameScore?.timeTaken || 0}
              />
            </>
          ) : (
            <AnimatePresence mode="wait">
              {!isTimerRunning ? (
                <>
                  {" "}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/10 p-8 rounded-lg backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative">
                        <Image
                          src={user.picture?.replace("_normal", "") || ""}
                          alt={user.name || ""}
                          width={64}
                          height={64}
                          className="rounded-full ring-4 ring-yellow-500"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{user.name}</h3>
                        <p className="text-purple-200">
                          Ready for today's challenge?
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleStartTimer} // Call handleStartTimer to restart the timer
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 text-lg"
                    >
                      <Timer className="h-6 w-6" />
                      Start Today's Challenge
                    </button>
                  </motion.div>
                  <LeaderboardCard />
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-800/90 px-6 py-2 rounded-full backdrop-blur-sm z-10">
                    <span className="text-xl font-bold">
                      {(elapsedTime / 1000).toFixed(1)}s
                    </span>
                  </div>

                  {currentQuestion && (
                    <QuestionCard
                      question={currentQuestion}
                      onAnswer={handleAnswer}
                      questionNumber={5 - questions.length + 1}
                      totalQuestions={5}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}
