export interface Employee {
  employeeId: string;
  employeeName: string;
  employeeEmail?: string;
  hashedPassword?: string;
  companyRole?: string;
  image?: string;
  privileges?: "Admin" | "User" | "Manager";
}

export interface Request {
  _id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  assignedManagerId: string | undefined;
  assignedManagerName: string | undefined;
  confirmedByHR: boolean;
  selfReview: boolean;
  dueDate?: Date;
  reviewers: Reviewer[];
}

export interface Reviewer {
  reviewerId: string;
  reviewerName: string;
  reviewerEmail: string;
  companyRole: string;
  feedbackSubmitted: boolean;
}

type SectionNameOption =
  | 'Quality focus'
  | 'People skills'
  | 'Self guidance'
  | 'Leadership'
  | 'Readiness for change'
  | 'Creativity'
  | 'General Evaluation';

export interface FeedbackData {
  requestId: string;
  employeeId: string;
  sections: Section[];
}

export interface Section {
  sectionName: SectionNameOption;
  score: Score[];
}

export interface Score {
  average: number;
  openFeedback: string[];
}


