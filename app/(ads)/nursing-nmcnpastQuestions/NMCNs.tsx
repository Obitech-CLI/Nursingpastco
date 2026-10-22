import { getNMCN } from "../../lib/nmcn";
import { NMCNType } from "../../types/types";
import { RetryButton } from "../../ui/Retry";
import SelectCategories from "./Categories";
import { NMCN } from "./NMCN";

type Prop = {
  nmcn?: NMCNType[];
  error?: string;
};

export default async function NMCNs({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const { category } = await searchParams;
  const res: Prop = await getNMCN(category);
  return (
    <div className="nmcn">
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
        </div>
      )}
      <SelectCategories />

      {res.nmcn?.length && (
        <>
          <NMCN nmcn={res?.nmcn} category={category} />
        </>
      )}
    </div>
  );
}
