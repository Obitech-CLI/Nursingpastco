"use client";

import { useState } from "react";
import { MessageType } from "./Messages";
import { Delete, X } from "lucide-react";
import { DeleteButton } from "./Delete";

type Props = {
  message: MessageType;
};

export function ModifyMessages({ message }: Props) {
  const [showMessage, setShowMessage] = useState(false);
  const [deleting, setDeleting] = useState(false);
  return (
    <>
      <div key={message.id} className="modify">
        <span>
          {new Date(message.created_at).toLocaleString("en-NG", {
            dateStyle: "medium",
            timeStyle: "short",
            hour12: true,
          })}
        </span>
        <h3>{message.fullname}</h3>
        <h4>{message.email}</h4>
        <div className="btns">
          <button type="button" onClick={() => setShowMessage(true)}>
            open message
          </button>
          <button type="button" onClick={() => setDeleting(true)}>
            <Delete color="red" size={25} />
            delete
          </button>
        </div>
        {showMessage && (
          <div className="message">
            <div>
              <button type="button" onClick={() => setShowMessage(false)}>
                <X />
              </button>
              {message.message}
            </div>
          </div>
        )}
      </div>
      {deleting && <DeleteButton id={message.id} setDeleting={setDeleting} />}
    </>
  );
}
