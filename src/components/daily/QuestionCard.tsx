"use client";

import { motion } from "framer-motion";
import { Question } from "@/types/game";
import { cn, shuffleArray } from "@/lib/utils";
import { useState } from "react";
import { useEffect } from "react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
  isSubmitting?: boolean;
}

export function QuestionCard({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  isSubmitting = false,
}: QuestionCardProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle answers once when question changes

    setOptions(
      shuffleArray([...question.incorrect_answers, question.correct_answer])
    );
  }, [question]);

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="bg-white/10 rounded-lg backdrop-blur-sm overflow-hidden">
      {/* Progress Header */}
      <div className="bg-purple-900/50 px-6 py-4 border-b border-purple-800/30">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm text-purple-200">
            <span>
              Question {questionNumber} of {totalQuestions}
            </span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="relative h-2 w-full bg-purple-950/50 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-medium mb-8 text-center">
          {question.question}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <motion.button
              key={option}
              onClick={() => onAnswer(option)}
              disabled={isSubmitting}
              className={cn(
                "w-full p-4 rounded-lg text-left transition-all",
                "bg-purple-900/30 hover:bg-purple-800/40",
                "border border-purple-700/30 hover:border-purple-600/50",
                "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                "active:scale-[0.98]",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={isSubmitting ? {} : { scale: 1.02 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-800/50 text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-purple-100">{option}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
