import { getNotes } from "../lib/notes";
import { RetryButton } from "../ui/Retry";
import { Note } from "./Note";

export default async function Notes() {
  const res = await getNotes();
  return (
    <div>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
      {res.notes?.length && (
        <div>
          {res.notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
