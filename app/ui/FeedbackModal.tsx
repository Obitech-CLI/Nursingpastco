"use client";

import { useEffect } from "react";
import "./ui.css";
import {
  useConfirmModal,
  useErrorModal,
  useSuccessModal,
} from "../contexts/modalContexts";
import { CircleAlert, CircleCheck } from "lucide-react";

function SuccessModal() {
  const { successMsg, setSuccessMsg } = useSuccessModal();

  useEffect(() => {
    document.body.style.overflow = successMsg ? "hidden" : "";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [successMsg]);

  return (
    <>
      {successMsg && (
        <div className="feedback-modal">
          <div className="success">
            <CircleCheck size={30} color="green" />
            <p className="success">{successMsg}</p>
            <button type="button" onClick={() => setSuccessMsg("")}>
              ok
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ErrorModal() {
  const { errorMsg, setErrorMsg } = useErrorModal();

  useEffect(() => {
    document.body.style.overflow = errorMsg ? "hidden" : "";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [errorMsg]);

  return (
    <>
      {errorMsg && (
        <div className="feedback-modal">
          <div className="error">
            <p className="error">{errorMsg}</p>
            <CircleAlert size={30} color="red" />
            <button type="button" onClick={() => setErrorMsg("")}>
              ok
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ConfirmModal() {
  const { confirmMsg, setConfirmMsg, setConfirm } = useConfirmModal();

  const dismiss = () => {
    setConfirm(false);
    setConfirmMsg("");
  };

  const proceed = () => {
    setConfirm(true);
    setConfirmMsg("");
  };

  useEffect(() => {
    document.body.style.overflow = confirmMsg ? "hidden" : "";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [confirmMsg]);

  return (
    <>
      {confirmMsg && (
        <div className="feedback-modal">
          <div className="error">
            <p>{confirmMsg}</p>
            <CircleAlert size={30} color="red" />
            <button
              type="button"
              onClick={dismiss}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              cancel
            </button>

            <button
              type="button"
              onClick={proceed}
              style={{ backgroundColor: "red", color: "white" }}
            >
              continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export { SuccessModal, ErrorModal, ConfirmModal };
