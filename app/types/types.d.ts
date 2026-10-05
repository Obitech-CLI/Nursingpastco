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
