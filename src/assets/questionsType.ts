type Question = {
  question: string;
  isFreeForm: boolean;
};

type Section = {
  name: string;
  description?: string;
  questions: Question[]; 
};

type FeedBackQuestions = {
  sections: Section[];
};

export {}