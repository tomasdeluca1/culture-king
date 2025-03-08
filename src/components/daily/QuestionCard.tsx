"use client";

import { motion } from "framer-motion";
import { Question } from "@/types/game";
import { Card, CardContent } from "@/components/ui/card";
import { shuffleArray } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle answers once when question changes
    setOptions(
      shuffleArray([...question.incorrect_answers, question.correct_answer])
    );
  }, [question]);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-purple-700/50">
      <CardContent className="p-8 space-y-6">
        <div className="flex flex-col gap-2 items-center mb-6">
          <Progress
            value={(questionNumber / totalQuestions) * 100}
            className="w-full h-2"
          />
          <span className="text-sm text-purple-200">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-center mb-8">
          {question.question}
        </h3>

        <div className="grid gap-4">
          {options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full text-left p-6 bg-purple-800/50 hover:bg-purple-700/50 rounded-lg transition-all transform hover:scale-102 hover:shadow-lg border border-purple-600/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-purple-700/50 flex items-center justify-center text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg">{option}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
