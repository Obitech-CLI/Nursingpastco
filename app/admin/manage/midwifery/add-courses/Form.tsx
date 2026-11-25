"use client";

import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { getInstituitions } from "@/app/lib/instituitions";
import { InstitutionType } from "@/app/types/types";
import { ChevronDown, List, PenBox } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { addMidwiferyCourse } from "./action";

const initialState = {
  msg: "",
  err: "",
};

export default function AddForm() {
  const [state, action, pending] = useActionState(
    addMidwiferyCourse,
    initialState,
  );
  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);

  const [instituitionsError, setInstituitionsError] = useState("");

  const [selectedInstituition, setSelectedInstituition] = useState("");

  const [showInstituitions, setShowInstituitions] = useState(false);

  const [iLoading, setILoading] = useState(false);

  const fetchInstituitions = async () => {
    try {
      setILoading(true);
      const res = await getInstituitions();
      if (res.instituitions) {
        setInstituitions(res.instituitions);
        return;
      }
      if (res.error) {
        setInstituitionsError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setILoading(false);
    }
  };

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  useEffect(() => {
    if (state?.msg) {
      setSuccessMsg(state.msg);
      setSelectedInstituition("");
    }
    if (state?.err) {
      setErrorMsg(state.err);
    }
  }, [state]);

  useEffect(() => {
    fetchInstituitions();
  }, []);

  return (
    <form className="auth" action={action}>
      <label>
        <List size={30} />
        <input
          type="hidden"
          name="instituition"
          defaultValue={selectedInstituition}
        />
        <button
          type="button"
          onClick={() => setShowInstituitions(!showInstituitions)}
        >
          {selectedInstituition ? selectedInstituition : "select instituition"}
          <ChevronDown />
        </button>
        {showInstituitions && (
          <div className="select">
            {iLoading ? (
              <div className="loading">
                <p>loading instituitions...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            ) : (
              <>
                {instituitions.length > 0 && (
                  <>
                    <h2>select instituition</h2>
                    <ul>
                      {instituitions.map((i) => (
                        <li
                          key={i.id}
                          onClick={() => setSelectedInstituition(i.name)}
                        >
                          {i.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {instituitionsError && (
                  <div className="retry">
                    <p>{instituitionsError}</p>
                    <button type="button" onClick={fetchInstituitions}>
                      retry
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </label>

      <label>
        <PenBox />
        <input type="text" name="course" placeholder="enter course..." />
      </label>

      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
