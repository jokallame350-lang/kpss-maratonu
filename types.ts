export interface Topic {
  id: string;
  title: string;
  isCompleted?: boolean;
}

export interface Subject {
  id: string;
  title: string;
  icon: string; // Lucide icon name or emoji
  color: string;
  topics: Topic[];
}

export interface PastQuestionInsight {
  year: string;
  insight: string;
}

export interface StudyContent {
  title: string;
  htmlContent: string;
  keyPoints: string[];
  examTrends?: string; // Last 5 years analysis summary
  superSummary?: string; // 1-2 sentence quick summary
  pastQuestionAnalysis?: PastQuestionInsight[]; // New: Specific year-based analysis
}

export interface Flashcard {
  id: string;
  subject: string;
  question: string;
  answer: string;
  detailTitle?: string;
  detailSummary?: string;
  detailContent?: string;
}

export interface ExamQuestion {
  id: string;
  subject: string;
  text: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
}