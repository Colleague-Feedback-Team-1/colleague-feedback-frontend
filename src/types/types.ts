// export interface Employee {
//   _id: string;
//   employeeName: string;
//   employeeEmail?: string;
// //  hashedPassword?: string;
//   companyRole?: string;
//   image?: string;
//   privileges?: "Admin" | "User" | "Manager";
// }
export interface Employee {
  _id: string;
  uid: string
  displayName: string
  givenName: string
  uidNumber: number
  gidNumber: number
  mail: string
  description: string
}

export interface UserContextProps {
  user: Employee | null
  setUser: (user: Employee | null) => void
}

export interface Request {
  _id: string
  employeeid: string
  employeeName: string
  employeeEmail: string
  assignedManagerid: string | undefined
  assignedManagerName: string | undefined
  confirmedByHR: boolean
  selfReview: boolean
  dueDate?: string
  reviewers: Reviewer[]
  createdAt?: string
  updatedAt?: string
}

export interface Reviewer {
  reviewerid: string
  reviewerName: string
  reviewerEmail: string
  role: string
  feedbackSubmitted: boolean
}

type SectionNameOption =
  | 'Quality focus'
  | 'People skills'
  | 'Self guidance'
  | 'Leadership'
  | 'Readiness for change'
  | 'Creativity'
  | 'General Evaluation'

export interface FeedbackData {
  requestId: string
  employeeId: string
  sections: Section[]
}

export interface Section {
  sectionName: SectionNameOption
  score: Score[]
}

export interface Score {
  average: number
  openFeedback: string[]
}
