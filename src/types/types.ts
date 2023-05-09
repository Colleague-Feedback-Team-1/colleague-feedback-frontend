import { type } from "os";

export interface Employee {
  _id: string;
  uid: string;
  displayName: string;
  givenName: string;
  uidNumber: number;
  gidNumber: number;
  mail: string;
  description: "HR" | "Manager" | "user";
}

export interface UserContextProps {
  user: Employee | null;
  setUser: (user: Employee | null) => void;
}

export interface Request {
  _id: string;
  employeeid: string;
  employeeName: string;
  employeeEmail: string;
  assignedManagerid: string | undefined;
  assignedManagerName: string | undefined;
  confirmedByHR: boolean;
  selfReview: boolean;
  dateRequested?: string;
  reviewers: Reviewer[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RequestWithoutId extends Omit<Request, "_id"> {}

export interface Reviewer {
  reviewerid: string;
  reviewerName: string;
  reviewerEmail: string;
  role: string;
  feedbackSubmitted: boolean;
}

export interface Question {
  _id: string;
  question: string;
  isFreeForm: boolean;
}

export interface QuestionSection {
  _id: string;
  sectionName: string;
  questions: Question[];
}

export interface CustomFormData {
  requestid: string;
  employeeid: string;
  submittedBy: "manager" | "reviewee" | "reviewer";
  answers: {
    [sectionId: string]: {
      [questionId: string]: string | number;
    };
  };
}

// for feedbackData
export type FeedbackScore = {
  submittedBy: string;
  average: number;
  openFeedback: string[];
};

export type FeedbackSection = {
  sectionName:
    | "People skills"
    | "Self guidance"
    | "Leadership"
    | "Readiness for change"
    | "Creativity"
    | "General evaluation";
  score: FeedbackScore[];
};

export type Feedback = FeedbackSection[];

// for Notification
export type NotificationType =
  | "confirmed-by-admin"
  | "denied-by-admin"
  | "create-new-request"
  | "ask-for-feedback"
  | "remind-give-feedback"
  | "remind-create-request"
  | "remind-self-review"
  | "feedback-submitted";

export type Sender = {
  employeeid: string;
  employeeName: string;
};
export type Receiver = {
  employeeid: string;
  employeeName: string;
};
export interface Notification {
  date: string;
  unread: boolean;
  type: NotificationType;
  sender: Sender[];
  receiver: Receiver[];
  requestid: string;
}
