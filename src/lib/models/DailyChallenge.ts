import mongoose from "mongoose";

const DailyChallengeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  score: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  rank: { type: Number },
}, {
  timestamps: true,
});

// Create compound index for unique daily attempts
DailyChallengeSchema.index({ userId: 1, date: 1 }, { unique: true });

// Calculate final score based on correct answers and time
DailyChallengeSchema.methods.calculateScore = function() {
  const baseScore = this.correctAnswers * 1000;
  const timeBonus = Math.max(0, 30000 - this.timeTaken) / 100;
  return Math.round(baseScore + timeBonus);
};

export const DailyChallenge = mongoose.models.DailyChallenge || 
  mongoose.model("DailyChallenge", DailyChallengeSchema); 