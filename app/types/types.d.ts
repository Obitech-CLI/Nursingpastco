import { type, ReactNode, SetStateAction } from "react";

export type SuccessModalType = {
  successMsg: string;
  setSuccessMsg: React.Dispatch<SetStateAction<string>>;
};

export type ErrorModalType = {
  errorMsg: string;
  setErrorMsg: React.Dispatch<SetStateAction<string>>;
};

export type ConfirmModalType = {
  confirm: boolean;
  setConfirm: React.Dispatch<SetStateAction<boolean>>;
  confirmMsg: string;
  setConfirmMsg: React.Dispatch<SetStateAction<string>>;
};

export type childrenNode = {
  children: ReactNode;
};

export interface InstitutionType {
  id: number;
  name: string;
  abbr: string;
  about: string;
  logo: any;
  created_at: string;
}

export interface PastQuestionType {
  id: number;
  instituition: string;
  course: string;
  level: string;
  title: string;
  pdf: any;
}

export interface CourseType {
  id: number;
  instituition: string;
  course: string;
  level: string;
  created_at: string;
}
