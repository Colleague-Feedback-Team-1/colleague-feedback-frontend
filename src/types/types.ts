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
  dateRequested?: string
  reviewers: Reviewer[]
  createdAt?: string
  updatedAt?: string
}

export interface RequestWithoutId extends Omit<Request, "_id"> {}

export interface Reviewer {
  reviewerid: string
  reviewerName: string
  reviewerEmail: string
  role: string
  feedbackSubmitted: boolean
}

export interface Question {
  _id: string
  question: string
  isFreeForm: boolean
}

export interface Section {
  _id: string
  sectionName: string
  questions: Question[]
}

export interface CustomFormData {
  requestid: string
  employeeid: string
  answers: {
    [sectionId: string]: {
      [questionId: string]: string | number
    }
  }
}