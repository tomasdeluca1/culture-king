"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface DailyChallengeResponse {
  hasPlayed: boolean;
  questions?: Question[];
  score?: number;
  rank?: number;
}

export default function CultureKing() {
  const { user, isLoading } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    async function fetchDailyChallenge() {
      try {
        const response = await axios.get<DailyChallengeResponse>(
          "/api/daily-challenge"
        );
        console.log(response.data);
        if (response.data.hasPlayed) {
          setHasPlayed(true);
          setUserScore(response.data.score || 0);
          setRank(response.data.rank || null);
          setIsGameOver(true);
        } else if (response.data.questions) {
          setQuestions(response.data.questions);
          setCurrentQuestion(response.data.questions[0]);
          setStartTime(Date.now());
        }
      } catch (error) {
        toast.error("Error fetching daily challenge.");
        console.error("Error fetching daily challenge:", error);
      }
    }

    if (user) {
      fetchDailyChallenge();
    }
  }, [user]);

  const handleAnswer = async (answerIndex: string) => {
    if (!currentQuestion || !startTime) return;

    if (currentQuestion.correct_answer === answerIndex) {
      setUserScore((prevScore) => prevScore + 1);
    }

    if (questions.length === 1) {
      const timeTaken = new Date().getTime() - startTime;
      try {
        const response = await axios.post("/api/daily-challenge", {
          correctAnswers:
            userScore +
            (currentQuestion.correct_answer === answerIndex ? 1 : 0),
          timeTaken,
        });
        setRank(response.data.rank);
        setIsGameOver(true);
      } catch (error) {
        console.error("Error saving challenge result:", error);
      }
    } else {
      setCurrentQuestion(questions[1]);
      setQuestions((prevQuestions) => prevQuestions.slice(1));
    }
  };

  const handlePlayAgain = () => {
    setIsGameOver(false);
    setUserScore(0);
    setQuestions([]);
    setStartTime(null);
  };

  const handleShareScore = () => {
    if (!startTime) return;
    const timeTaken = new Date().getTime() - startTime;
    const tweetUrl = `https://twitter.com/intent/tweet?text=I scored ${userScore} out of 5 in the Culture King daily challenge in ${timeTaken}ms! Can you beat my score?`;
    window.open(tweetUrl, "_blank");
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white absolute inset-0">
        <span className="text-xl">Loading...</span>
      </div>
    );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <h1 className="text-4xl font-bold">Culture King</h1>
          <p className="text-xl">
            A daily knowledge competition where you can show off your skills and
            compete with others.
          </p>
          <a
            href="/api/auth/login"
            className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors"
          >
            Login to Play
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Culture King - Daily Knowledge Competition</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Today&#39;s Leaderboard</h2>
            <div className="space-y-4">{/* Add leaderboard logic here */}</div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={user?.picture || ""}
                alt={user?.name || ""}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-sm">
                  Today&#39;s Score: {userScore}
                  {isGameOver && (
                    <span className="text-green-500 mx-2"> (Game Over)</span>
                  )}
                </p>
              </div>
            </div>

            {isGameOver ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold">
                  You scored {userScore} out of 5 in{" "}
                  {startTime ? new Date().getTime() - startTime : 0}ms!
                </h3>
                <div className="flex gap-4">
                  <button
                    onClick={handlePlayAgain}
                    className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={handleShareScore}
                    className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Share on Twitter
                  </button>
                </div>
              </motion.div>
            ) : currentQuestion ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold">
                  {currentQuestion.question.replace(/&quot;/g, '"')}
                </h3>
                <div className="space-y-2">
                  {currentQuestion.incorrect_answers.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-4 bg-white/5 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                  <button
                    onClick={() => handleAnswer(currentQuestion.correct_answer)}
                    className="w-full text-left p-4 bg-white/5 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {currentQuestion.correct_answer}
                  </button>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
