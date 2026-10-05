"use client";

import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { resolveCoursesUpdate } from "../action";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export function ResolveUpdate() {
  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const [loading, setLoading] = useState(false);

  const handleResolve = async () => {
    try {
      setLoading(true);
      const res = await resolveCoursesUpdate();
      if (res.msg) {
        setSuccessMsg(res.msg);
      }
      if (res.err) {
        setErrorMsg(res.err);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button type="button" onClick={handleResolve} disabled={loading}>
      {loading ? "resolving..." : "resolve update"}
      {loading && <ClipLoader size={25} />}
    </button>
  );
}
