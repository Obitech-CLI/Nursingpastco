import { getMessages } from "@/app/lib/messages";
import { RetryButton } from "@/app/ui/Retry";
import { ModifyMessages } from "./Modify";
import { MessageType } from "@/app/types/types";

type Type = {
  messages?: MessageType[];
  error?: string;
};

export default async function Messages() {
  const res: Type = await getMessages();
  return (
    <div className="messages">
      {res.messages?.length && (
        <>
          <h2>messages</h2>
          {res.messages.length > 0 && (
            <>
              {res.messages.map((message) => (
                <ModifyMessages key={message.id} message={message} />
              ))}
            </>
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
