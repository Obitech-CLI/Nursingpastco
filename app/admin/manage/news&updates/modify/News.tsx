import { getNews } from "@/app/lib/news";
import { RetryButton } from "@/app/ui/Retry";
import { ModifyNews } from "./Modify";
import SelectCategories from "./Categories";

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

      <SelectCategories />

      {res.news?.length && (
        <div>
          {category && !search ? <h3>{res.news[0].category}</h3> : null}
          {category && search ? <h3>{res.news[0].category}</h3> : null}
          {res.news.map((news) => (
            <ModifyNews key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
}
