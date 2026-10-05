"use client";

import { useActionState, useEffect, useState } from "react";
import { addCourse } from "./action";
import { InstitutionType } from "@/app/nursing-instituitions/Instituitions";
import { getInstituitions } from "@/app/lib/instituitions";
import { selectLevels } from "@/app/ui/Options";
import { ChevronDown, List, PenBox } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";

const initialState = {
  msg: "",
  err: "",
};

export function AddForm() {
  const [state, action, pending] = useActionState(addCourse, initialState);

  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);
  const [instituitionError, setInstituitionError] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedInstituition, setSelectedInstituition] = useState("");
  const [showInstituitions, setShowInstituitions] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState("");
  const [showLevels, setShowLevels] = useState(false);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const fetchInstituitions = async () => {
    try {
      setLoading(true);
      const res = await getInstituitions();
      if (res.instituitions) {
        setInstituitions(res.instituitions);
        return;
      }
      if (res.error) {
        setInstituitionError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstituitions();
  }, []);

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
      setSelectedInstituition("");
      setSelectedLevel("");
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);

  return (
    <form action={action}>
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
            {loading ? (
              <p>loading instituitions...</p>
            ) : (
              <>
                {instituitions.length > 0 && (
                  <ul>
                    <h2>select instituition</h2>
                    {instituitions.map((i) => (
                      <li
                        key={i.id}
                        onClick={() => setSelectedInstituition(i.name)}
                      >
                        {i.name}
                      </li>
                    ))}
                  </ul>
                )}
                {instituitionError && (
                  <div className="retry">
                    <p>{instituitionError}</p>
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
        <PenBox size={30} />
        <input type="text" name="course" placeholder="enter course" />
      </label>
      <label>
        <List size={30} />
        <input type="hidden" name="level" defaultValue={selectedLevel} />
        <button type="button" onClick={() => setShowLevels(!showLevels)}>
          {selectedLevel ? selectedLevel : "select level"}
          <ChevronDown />
        </button>
        {showLevels && (
          <div className="select">
            <ul>
              <h2>select level</h2>
              {selectLevels.map((l) => (
                <li key={l.id} onClick={() => setSelectedLevel(l.level)}>
                  {l.level}
                </li>
              ))}
            </ul>
          </div>
        )}
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
