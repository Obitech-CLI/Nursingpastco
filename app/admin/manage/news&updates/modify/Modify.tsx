"use client";

import { NewsType } from "@/app/types/types";
import { Delete, Edit, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { UpdateNews } from "./action";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { ClipLoader } from "react-spinners";

type Props = {
  news: NewsType;
};

const initialState = {
  err: "",
  msg: "",
};

export function ModifyNews({ news }: Props) {
  const [state, action, pending] = useActionState(UpdateNews, initialState);
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
          {new Date(news.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            weekday: "short",
            month: "short",
            year: "numeric",
          })}
        </span>
        <h3>{news.title}</h3>
        <Image
          alt=""
          src={news.image}
          width={200}
          height={200}
          loading="eager"
        />

        <span>posted by: {news.author}</span>
        <p>{news.news}</p>
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
          <h3>update news&updates</h3>
          <input type="hidden" name="id" defaultValue={news.id} />
          <input type="hidden" name="category" defaultValue={news.category} />
          <label>
            title
            <input
              type="title"
              name="title"
              defaultValue={news.title}
              placeholder="enter title..."
            />
          </label>
          <label>
            upload image
            <input type="file" name="image" accept="image/*" />
          </label>
          <label>
            news
            <textarea
              name="content"
              defaultValue={news.news}
              placeholder="enter news..."
            />
          </label>
          <button type="submit" disabled={pending}>
            {pending ? "updating..." : "update"}
            {pending && <ClipLoader />}
          </button>
        </form>
      )}
    </>
  );
}
