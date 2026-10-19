"use client";

import { ContentType } from "@/app/types/types";
import { Delete, Edit, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import "./modify.css";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { UpdateContents } from "./action";
import { DeleteContentForm } from "./Delete";

type Props = {
  content: ContentType;
};

const initialState = {
  err: "",
  msg: "",
};

export function ModifyContents({ content }: Props) {
  const [state, action, pending] = useActionState(UpdateContents, initialState);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    document.body.style.overflow = editing ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editing]);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);
  return (
    <>
      <article>
        <span>
          {new Date(content.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            weekday: "short",
            month: "short",
            year: "numeric",
          })}
        </span>
        <h3>{content.title}</h3>
        <div>
          {["mp4", "webm", "mov", "m4v"].includes(
            content.file.slice(content.file.lastIndexOf(".") + 1).toLowerCase(),
          ) && <video src={content.file} controls />}
          {["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"].includes(
            content.file.slice(content.file.lastIndexOf(".") + 1).toLowerCase(),
          ) && (
            <Image
              alt=""
              src={content.file}
              width={200}
              height={200}
              loading="eager"
            />
          )}
        </div>
        <span>posted by: {content.author}</span>
        <p>{content.content}</p>
      </article>
      <div className="btns">
        <button type="button" onClick={() => setEditing(true)}>
          <Edit color="blue" />
        </button>
        <button type="button" onClick={() => setDeleting(true)}>
          <Delete color="red" />
        </button>
      </div>
      {editing && (
        <form className="edit-form" action={action}>
          <button
            type="button"
            className="cancel"
            onClick={() => setEditing(false)}
          >
            <X />
          </button>
          <h3>update content</h3>
          <input type="hidden" name="id" defaultValue={content.id} />
          <input
            type="category"
            name="category"
            defaultValue={content.category}
          />
          <label>
            title
            <input
              type="title"
              name="title"
              defaultValue={content.title}
              placeholder="enter title..."
            />
          </label>
          <label>
            upload video / image
            <input type="file" name="file" accept="video/*, image/*" />
          </label>
          <label>
            content
            <textarea
              name="content"
              defaultValue={content.content}
              placeholder="enter content..."
            />
          </label>
          <button type="submit" disabled={pending}>
            {pending ? "updating..." : "update"}
            {pending && <ClipLoader />}
          </button>
        </form>
      )}
      {deleting && (
        <DeleteContentForm id={content.id} setDeleting={setDeleting} />
      )}
    </>
  );
}
