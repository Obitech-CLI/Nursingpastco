"use client";

import { NMCCourseType } from "@/app/types/types";
import { Delete, Edit2, X } from "lucide-react";
import { useState } from "react";
import { DeleteForm } from "./Delete";

export default function Course({ course }: { course: NMCCourseType }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  return (
    <>
      <h4>{course.course}</h4>
      <button type="button" onClick={() => setEditing(true)}>
        <Edit2 />
      </button>
      <button type="button" onClick={() => setDeleting(true)}>
        <Delete color="red" />
      </button>
      {editing && (
        <form className="edit-form">
          <button
            type="button"
            className="cancel"
            onClick={() => setEditing(false)}
          >
            <X />
          </button>
          <h3>update nmc course</h3>
          <input type="hidden" name="id" defaultValue={course.id} />
          <label>
            <input type="text" name="course" defaultValue={course.course} />
          </label>
        </form>
      )}
      {deleting && (
        <DeleteForm
          id={course.id}
          setDeleting={setDeleting}
          editing={editing}
        />
      )}
    </>
  );
}
