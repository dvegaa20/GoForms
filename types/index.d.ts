declare interface Form {
  id: string;
  title: string;
  description: string;
  topic: string;
  questions: Question[];
  createdAt: string;
  createdBy: string;
}

declare interface Question {
  order: number;
  question_type:
    | "integer"
    | "multiple-choice"
    | "text"
    | "number"
    | "boolean"
    | "rating"
    | "email";
  question_title: string;
  question_description?: string;
  options?: string[];
}

declare type ErrorResponse = {
  statusCode: number;
  message: string;
};
