export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface DailyScore {
  userId: string;
  score: number;
  timeTaken: number;
  date: Date;
  rank?: number;
} 