"use client";

import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { resolveCoursesDelete } from "../action";

export function ResolveDelete() {
  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const [loading, setLoading] = useState(false);

  const handleResolve = async () => {
    try {
      setLoading(true);
      const res = await resolveCoursesDelete();
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
      {loading ? "resolving..." : "resolve delete"}
      {loading && <ClipLoader size={25} />}
    </button>
  );
}
