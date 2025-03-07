import axios from "axios";
import crypto from "crypto";
import toast from "react-hot-toast";
interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export async function getTodaysQuestions(): Promise<Question[]> {
  const today = new Date().toISOString().split("T")[0];
  const seed = crypto.createHash("md5").update(today).digest("hex");

  try {
    const { data, status } = await axios.get(
      `https://opentdb.com/api.php?amount=5&category=9&seed=${seed}`
    );

    if (status === 429) {
      const errorMessage = "Too many requests. Please try again later.";
      toast.error(errorMessage);
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    return data.results.map((q: Question) => ({
      ...q,
      question: decodeHTMLEntities(q.question),
      correct_answer: decodeHTMLEntities(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(decodeHTMLEntities),
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
