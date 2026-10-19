import { getNewsCategories } from "@/app/lib/categories";
import { CategoryType } from "@/app/types/types";
import { RetryButton } from "@/app/ui/Retry";
import { Category } from "./Category";

type ResType = {
  categories?: CategoryType[];
  error?: string;
};
export default async function Categories() {
  const res: ResType = await getNewsCategories();
  return (
    <div>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
      {res.categories?.length && (
        <>
          {res.categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </>
      )}
    </div>
  );
}
