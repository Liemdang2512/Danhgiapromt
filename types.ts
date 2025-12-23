
export interface AnalysisScore {
  specificity: number;
  clarity: number;
  format: number;
  context: number;
  guidance: number;
  quality: number;
  optimization: number;
}

export interface FrameworkDetection {
  primary: string;
  confidence: number;
  secondary: string;
  explanation: string;
}

export interface ComponentAnalysis {
  present: string[];
  vague: string[];
  missing: string[];
}

export interface OptimizedSection {
  label: string;
  content: string;
}

export interface OptimizedPrompt {
  frameworkUsed: string;
  sections: OptimizedSection[];
}

export interface AnalysisResult {
  frameworkDetection: FrameworkDetection;
  componentAnalysis: ComponentAnalysis;
  scores: AnalysisScore;
  weaknesses: string[];
  summary: string;
  suggestions: string[];
  optimizedPrompt: OptimizedPrompt;
}

export interface UserInput {
  prompt: string;
  framework: string;
  purpose: string;
  goal: string;
}
