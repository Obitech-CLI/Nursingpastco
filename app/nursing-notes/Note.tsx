"use client";

import { NotesType } from "../types/types";

type Prop = {
  note: NotesType;
};

export function Note({ note }: Prop) {
  return (
    <div>
      <button type="button">{note.title}</button>
    </div>
  );
}
