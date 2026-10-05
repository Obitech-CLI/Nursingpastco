"use client";

import {
  childrenNode,
  ConfirmModalType,
  ErrorModalType,
  SuccessModalType,
} from "@/app/types/types";
import { createContext, useContext, useState } from "react";

const SuccessModalContext = createContext<SuccessModalType | null>(null);

function SuccessModalProvider({ children }: childrenNode) {
  const [successMsg, setSuccessMsg] = useState<string>("");

  return (
    <SuccessModalContext.Provider
      value={{
        successMsg,
        setSuccessMsg,
      }}
    >
      {children}
    </SuccessModalContext.Provider>
  );
}

const ErrorModalContext = createContext<ErrorModalType | null>(null);

function ErrorModalProvider({ children }: childrenNode) {
  const [errorMsg, setErrorMsg] = useState<string>("");

  return (
    <ErrorModalContext.Provider
      value={{
        errorMsg,
        setErrorMsg,
      }}
    >
      {children}
    </ErrorModalContext.Provider>
  );
}

const ConfirmModalContext = createContext<ConfirmModalType | null>(null);

function ConfirmModalProvider({ children }: childrenNode) {
  const [confirmMsg, setConfirmMsg] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);

  return (
    <ConfirmModalContext.Provider
      value={{
        confirm,
        setConfirm,
        confirmMsg,
        setConfirmMsg,
      }}
    >
      {children}
    </ConfirmModalContext.Provider>
  );
}

export { SuccessModalProvider, ErrorModalProvider, ConfirmModalProvider };

export const useSuccessModal = () => {
  const context = useContext(SuccessModalContext);
  if (!context) {
    throw new Error("no context available");
  }

  return context;
};

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error("no context available");
  }

  return context;
};

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error("no context available");
  }

  return context;
};
