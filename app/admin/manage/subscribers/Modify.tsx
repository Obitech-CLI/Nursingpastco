"use client";

import { useState } from "react";
import { SubscriberType } from "./Subscribers";
import { UnSubscribe } from "./UnSubscribe";

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
              />
            )}
          </>
        </td>
      </tr>
    </>
  );
}
