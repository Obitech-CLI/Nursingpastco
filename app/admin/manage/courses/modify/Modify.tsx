"use client";

import { useActionState, useEffect, useState } from "react";
import { DeleteForm } from "./Delete";
import { updateCourse } from "./action";
import { getInstituitions } from "@/app/lib/instituitions";
import { selectLevels } from "@/app/ui/Options";
import { ChevronDown, Delete, PenBox } from "lucide-react";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { CourseType, InstitutionType } from "@/app/types/types";

type Props = {
  course: CourseType;
};

const initialState = {
  msg: "",
  err: "",
};

export function ModifyCourse({ course }: Props) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [state, action, pending] = useActionState(updateCourse, initialState);

  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);
  const [instituitionError, setInstituitionError] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedInstituition, setSelectedInstituition] = useState("");
  const [showInstituitions, setShowInstituitions] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState("");
  const [showLevels, setShowLevels] = useState(false);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const router = useRouter();

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
      setSelectedInstituition("");
      setSelectedLevel("");
      setEditing(false);
      setSuccessMsg(state.msg);
      router.refresh();
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);

  return (
    <>
      <form key={course.id} action={action} className="edit">
        <input
          type="hidden"
          name="course-id"
          value={editing ? Number(course.id) : ""}
        />
        <label>
          <input
            type="hidden"
            name="instituition"
            defaultValue={selectedInstituition || course.instituition}
          />
          <button
            type="button"
            onClick={() => {
              if (editing) {
                setShowInstituitions(!showInstituitions);
              }
            }}
          >
            {selectedInstituition ? selectedInstituition : course.instituition}
            {editing && <ChevronDown />}
          </button>
          {showInstituitions && (
            <div className="select">
              {loading ? (
                <p>loading instituitions...</p>
              ) : (
                <>
                  {instituitions.length > 0 && (
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
                  )}
                  {instituitionError && (
                    <div>
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
          <input
            type="text"
            name="course"
            defaultValue={course.course ?? ""}
            disabled={!editing}
          />
        </label>
        <label>
          <input
            type="hidden"
            name="level"
            defaultValue={selectedLevel || course.level}
          />
          <button
            type="button"
            onClick={() => {
              if (editing) {
                setShowLevels(!showLevels);
              }
            }}
          >
            {selectedLevel ? selectedLevel : course.level}
            {editing && <ChevronDown />}
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
        <div className="btns">
          <button
            type="button"
            onClick={() => setDeleting(true)}
            disabled={editing}
          >
            <Delete size={25} color="red" />
            delete
          </button>
          <button onClick={() => setEditing(!editing)} type="button">
            <PenBox color="blue" size={25} />
            {editing ? "cancel" : "edit"}
          </button>
        </div>

        {editing && (
          <button type="submit" disabled={pending}>
            {pending ? "updating..." : "update"}
          </button>
        )}
      </form>
      {deleting && (
        <DeleteForm
          id={course.id}
          editing={editing}
          deleting={deleting}
          setDeleting={setDeleting}
        />
      )}
    </>
  );
}
