/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import { QuestionCard } from "@/components/daily/QuestionCard";
import { Question } from "@/types/game";
import { LeaderboardCard } from "@/components/daily/LeaderboardCard";

import { CompletedChallengeCard } from "@/components/daily/CompletedChallengeCard";

interface DailyChallengeResponse {
  hasPlayed: boolean;
  questions?: Question[];
  userGameScore?: any;
}

export default function CultureKing() {
  const { user, isLoading } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userGameScore, setUserGameScore] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    async function fetchDailyChallenge() {
      try {
        const response = await axios.get<DailyChallengeResponse>(
          "/api/daily-challenge"
        );
        if (response.data.hasPlayed) {
          setHasPlayed(true);
          setUserGameScore(response?.data?.userGameScore || null);
          setRank(response?.data?.userGameScore?.rank || null);
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

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion || !startTime) return;

    const isCorrect = currentQuestion.correct_answer === answer;
    if (isCorrect) {
      setUserGameScore((prev: any) => ({
        ...prev,
        score: (prev.score || 0) + 1,
      }));
    }

    if (questions.length === 1) {
      const timeTaken = Date.now() - startTime;
      try {
        const response = await axios.post("/api/daily-challenge", {
          correctAnswers: userGameScore.score + (isCorrect ? 1 : 0),
          timeTaken,
        });
        setRank(response.data.rank);
        setHasPlayed(true);
      } catch (error) {
        console.error("Error saving challenge result:", error);
        toast.error("Failed to save your score");
      }
    } else {
      setCurrentQuestion(questions[1]);
      setQuestions((prev) => prev.slice(1));
    }
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
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://culture-king.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Culture King" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Culture King Logo" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <LeaderboardCard />
          {hasPlayed ? (
            <CompletedChallengeCard
              userGameScore={userGameScore}
              rank={rank}
              timeTaken={startTime ? Date.now() - startTime : 0}
            />
          ) : (
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={user?.picture?.replace("_normal", "") || ""}
                  alt={user?.name || ""}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold">{user?.name}</h3>
                  <p className="text-sm">
                    Today's Score: {userGameScore?.score || 0}
                  </p>
                </div>
              </div>

              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
