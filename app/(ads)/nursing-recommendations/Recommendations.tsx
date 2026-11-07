import { RetryButton } from "@/app/ui/Retry";
import { getRecommendations } from "../../lib/recommendations";
import { Recommendation } from "./Recommendation";
import { Pagination } from "./Pagination";

export default async function Recommendations({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page: string;
  }>;
}) {
  const { category, search, page } = await searchParams;
  const res = await getRecommendations(category, search, page);
  return (
    <div className="recommendations">
      {res.error && (
        <div className="retry">
          <p style={{ whiteSpace: "pre-line" }}>{res.error}</p>
          <RetryButton />
        </div>
      )}

      {res.recommendations?.length && (
        <>
          {category && !search ? (
            <h3>{res.recommendations[0].category}</h3>
          ) : null}
          {category && search ? (
            <h3>{res.recommendations[0].category}</h3>
          ) : null}

          <div className="recommendation">
            {res.recommendations.map((recommendation) => (
              <Recommendation
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </div>
        </>
      )}
      <Pagination ppage={page} />
    </div>
  );
}
