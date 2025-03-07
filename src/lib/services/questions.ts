import axios from "axios";
interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

// Cache to store daily questions
let dailyQuestionsCache: Question[] | null = null;
let lastFetchDate: string | null = null;

export async function getTodaysQuestions(): Promise<Question[]> {
  const today = new Date().toISOString().split("T")[0];

  // Check if questions for today are already cached
  if (dailyQuestionsCache && lastFetchDate === today) {
    return dailyQuestionsCache;
  }

  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const { data } = await axios.get("https://opentdb.com/api.php?amount=5");

      if (data.response_code !== 0) {
        throw new Error(`API Error: Response code ${data.response_code}`);
      }

      // Decode HTML entities in questions and answers
      const decodedQuestions = data.results.map((q: Question) => ({
        ...q,
        question: decodeHTMLEntities(q.question),
        correct_answer: decodeHTMLEntities(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHTMLEntities),
      }));

      // Cache the questions for today
      dailyQuestionsCache = decodedQuestions;
      lastFetchDate = today;

      return decodedQuestions;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} - Error fetching questions:`, error);
      if (attempts === maxRetries) {
        throw new Error(
          "Failed to fetch daily questions after multiple attempts."
        );
      }
    }
  }

  throw new Error("Failed to fetch daily questions.");
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
