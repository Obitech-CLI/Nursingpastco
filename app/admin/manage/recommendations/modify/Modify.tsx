"use client";

import { RecommendationType } from "@/app/types/types";
import { Delete, Edit, Link, Link2, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { UpdateRecommendations } from "./action";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";

type Props = {
  recommendation: RecommendationType;
};

const initialState = {
  msg: "",
  err: "",
};

export function ModifyRecommendations({ recommendation }: Props) {
  const [state, action, pending] = useActionState(
    UpdateRecommendations,
    initialState,
  );
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
          {new Date(recommendation.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            weekday: "short",
            month: "short",
            year: "numeric",
          })}
        </span>
        <h3>{recommendation.title}</h3>
        <Image
          alt=""
          src={recommendation.image}
          width={200}
          height={200}
          loading="eager"
        />

        <span>posted by: {recommendation.author}</span>
        <p>{recommendation.recommendation}</p>
        <Link href={recommendation.link}>
          goto recommendation <Link2 />
        </Link>
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
          <input type="hidden" name="id" defaultValue={recommendation.id} />
          <input
            type="hidden"
            name="category"
            defaultValue={recommendation.category}
          />
          <label>
            title
            <input
              type="title"
              name="title"
              defaultValue={recommendation.title}
              placeholder="enter title..."
            />
          </label>
          <label>
            upload image
            <input type="file" name="image" accept="image/*" />
          </label>
          <label>
            recommendation
            <textarea
              name="content"
              defaultValue={recommendation.recommendation}
              placeholder="enter news..."
            />
          </label>
          <label>
            link
            <input
              type="link"
              name="link"
              defaultValue={recommendation.link}
              placeholder="enter link..."
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
