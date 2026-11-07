"use client";

import { NMCPastQuestionType } from "@/app/types/types";
import { Delete, Edit2, X } from "lucide-react";
import { useState } from "react";

export default function PastQuestion({
  pastQuestion,
}: {
  pastQuestion: NMCPastQuestionType;
}) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  return (
    <>
      <h3>{pastQuestion.title}</h3>
      <button type="button" onClick={() => setEditing(true)}>
        <Edit2 color="blue" />
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
          <h3>update nmc pastQuestion</h3>
          <label>
            nmc past question pdf
            <input type="file" accept="application/pdf" />
          </label>
          <button type="submit">update</button>
        </form>
      )}
    </>
  );
}
