"use client";

import { useState } from "react";
import { UnSubscribe } from "./UnSubscribe";
import { SubscriberType } from "@/app/types/types";

type Props = {
  subscriber: SubscriberType;
  index: number;
};

export function ModifySubscribers({ subscriber, index }: Props) {
  const [unsubscribing, setUnsubscribing] = useState(false);
  return (
    <>
      <tr key={subscriber.id}>
        <td>{index + 1}</td>
        <td>{subscriber.email}</td>
        <td>
          {new Date(subscriber.created_at).toLocaleString("en-NG", {
            dateStyle: "medium",
            timeStyle: "short",
            hour12: true,
          })}
        </td>
        <td style={{ padding: "0 1rem", border: "none" }}>
          <button type="button" onClick={() => setUnsubscribing(true)}>
            Unsubscribe
          </button>
          <>
            {unsubscribing && (
              <UnSubscribe
                id={subscriber.id}
                setUnsubscribing={setUnsubscribing}
                email={subscriber.email}
              />
            )}
          </>
        </td>
      </tr>
    </>
  );
}
