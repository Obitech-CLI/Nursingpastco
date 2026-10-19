import { RetryButton } from "@/app/ui/Retry";
import { getRecommendations } from "../lib/recommendations";
import { Recommendation } from "./Recommendation";

export default async function Recommendations({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const { category, search } = await searchParams;
  const res = await getRecommendations(category, search);
  return (
    <div className="recommendations">
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}

      {res.recommendations?.length && (
        <div>
          {category && !search ? (
            <h3>{res.recommendations[0].category}</h3>
          ) : null}
          {category && search ? (
            <h3>{res.recommendations[0].category}</h3>
          ) : null}
          {res.recommendations.map((recommendation) => (
            <Recommendation
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
