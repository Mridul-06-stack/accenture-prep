export interface OtherLink {
  name: string;
  url: string;
}

export interface QuestionLinks {
  leetcode?: string;
  gfg?: string;
  codingninjas?: string;
  others?: OtherLink[];
}

export interface Question {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Basic" | "Core" | "Pro";
  topic: string[];
  round: string;
  year: number;
  frequency: "High" | "Medium" | "Low";
  links?: QuestionLinks;
}
