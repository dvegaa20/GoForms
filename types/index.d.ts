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
  question_type: "integer" | "radio" | "text" | "number" | "boolean";
  question_title: string;
  question_description?: string;
  options?: string[];
  required?: boolean;
}

declare type QuestionType = "text" | "single" | "multiple";

declare type ErrorResponse = {
  statusCode: number;
  message: string;
};

declare interface DialogState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

declare interface EditingModeState {
  isEditingMode: boolean;
  setEditingMode: (value: boolean) => void;
  toggleEditingMode: () => void;
}

declare interface FormState {
  title: string;
  setTitle: (title: string) => void;
}

declare interface FormStore {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}
