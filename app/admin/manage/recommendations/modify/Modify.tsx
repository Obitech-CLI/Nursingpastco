"use client";

import { RecommendationType } from "@/app/types/types";
import { Delete, Edit, Link2, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { UpdateRecommendations } from "./action";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteRecommendation } from "./Delete";

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

  const router = useRouter();
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
      router.refresh();
      setEditing(false);
      setSuccessMsg(state.msg);
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);
  return (
    <>
      <article>
        <h3>{recommendation.title}</h3>
        <Image
          alt=""
          src={recommendation.image}
          width={200}
          height={200}
          loading="eager"
        />
        <p>{recommendation.recommendation}</p>
        <Link href={recommendation.link}>
          goto recommendation <Link2 />
        </Link>
        <div className="btns">
          <button type="button" onClick={() => setEditing(true)}>
            <Edit color="blue" />
          </button>
          <button type="button" onClick={() => setDeleting(true)}>
            <Delete color="red" />
          </button>
        </div>
      </article>
      {editing && (
        <form className="edit-form" action={action}>
          <button
            type="button"
            className="cancel"
            onClick={() => setEditing(false)}
          >
            <X />
          </button>
          <h3>update recommendation</h3>
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
              name="recommendation"
              defaultValue={recommendation.recommendation}
              placeholder="enter recommendation..."
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
      {deleting && (
        <DeleteRecommendation
          id={recommendation.id}
          setDeleting={setDeleting}
        />
      )}
    </>
  );
}
