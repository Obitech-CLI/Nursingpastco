import { getSubscribers } from "@/app/lib/subscribers";
import { RetryButton } from "@/app/ui/Retry";
import { ModifySubscribers } from "./Modify";
import { SubscriberType } from "@/app/types/types";

type Type = {
  subscribers?: SubscriberType[];
  error?: string;
};

export default async function Subscribers({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string;
  }>;
}) {
  const { email } = await searchParams;
  const res: Type = await getSubscribers(email);
  return (
    <div className="subscribers">
      {res.subscribers?.length && (
        <>
          <h2>subscribers</h2>
          {res.subscribers.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>no</th>
                  <th>email address</th>
                  <th>subscribed_at</th>
                </tr>
              </thead>
              <tbody>
                {res.subscribers.map((subscriber, index) => (
                  <ModifySubscribers
                    key={subscriber.id}
                    index={index}
                    subscriber={subscriber}
                  />
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
    </div>
  );
}
