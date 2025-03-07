"use client";

import { motion } from "framer-motion";
import { Question } from "@/types/game";
import { Card, CardContent } from "@/components/ui/card";
import { shuffleArray } from "@/lib/utils";
import { useState, useEffect } from "react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle answers once when question changes
    setOptions(
      shuffleArray([...question.incorrect_answers, question.correct_answer])
    );
  }, [question]);

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">{question.question}</h3>
        <div className="space-y-2">
          {options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full text-left p-4 bg-white/5 hover:bg-white/20 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 