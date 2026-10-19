import { getTextbooks } from "../lib/textbooks";
import { RetryButton } from "../ui/Retry";
import { TextBook } from "./TextBook";

export default async function TextBooks() {
  const res = await getTextbooks();
  return (
    <div>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
      {res.textbooks?.length && (
        <div>
          {res.textbooks.map((textbook) => (
            <TextBook key={textbook.id} textbook={textbook} />
          ))}
        </div>
      )}
    </div>
  );
}
