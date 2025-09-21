type responseMessage = "Correct!" | "Incorrect!";

export type ExerciseAttemptResponse = {
  correct: boolean;
  score: number;
  message: responseMessage;
  correctResponses: number[];
  correctAnswer: string;
};
