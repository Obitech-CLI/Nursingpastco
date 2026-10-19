import { getNMCN } from "../lib/nmcn";
import { RetryButton } from "../ui/Retry";
import { NMCN } from "./NMCN";

export default async function NMCNs() {
  const res = await getNMCN();
  return (
    <div>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
      {res.nmcn?.length && (
        <div>
          {res.nmcn.map((nmc) => (
            <NMCN key={nmc.id} nmc={nmc} />
          ))}
        </div>
      )}
    </div>
  );
}
