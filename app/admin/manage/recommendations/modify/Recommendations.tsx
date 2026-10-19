import { RetryButton } from "@/app/ui/Retry";
import { ModifyRecommendations } from "./Modify";
import { getRecommendations } from "@/app/lib/recommendations";
import SelectCategories from "./Categories";

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
    <div>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}

      <SelectCategories />

      {res.recommendations?.length && (
        <div>
          {res.recommendations.map((recommendation) => (
            <ModifyRecommendations
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
