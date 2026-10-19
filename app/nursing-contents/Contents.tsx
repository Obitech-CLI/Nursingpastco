import { RetryButton } from "@/app/ui/Retry";
import { getContents } from "@/app/lib/contents";
import { Content } from "./Content";

export default async function Contents({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const { category, search } = await searchParams;
  const res = await getContents(category, search);
  return (
    <div className="contents">
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}

      {res.contents?.length && (
        <div>
          {category && !search ? <h3>{res.contents[0].category}</h3> : null}
          {category && search ? <h3>{res.contents[0].category}</h3> : null}
          {res.contents.map((content) => (
            <Content key={content.id} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}
