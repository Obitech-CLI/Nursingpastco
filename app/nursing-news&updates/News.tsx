import { RetryButton } from "@/app/ui/Retry";
import { getNews } from "../lib/news";
import { New } from "./New";

export default async function News({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const { category, search } = await searchParams;
  const res = await getNews(category, search);
  return (
    <div className="news">
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}

      {res.news?.length && (
        <>
          <div className="feedback">
            {search && !category ? (
              <p>search result found for {search}</p>
            ) : null}
            {category && !search ? <h3>{res.news[0].category}</h3> : null}
            {category && search ? (
              <>
                <h3>{res.news[0].category}</h3>
                <p>search result found for {search}</p>
              </>
            ) : null}
          </div>
          <div className="new">
            {res.news.map((news) => (
              <New key={news.id} news={news} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
