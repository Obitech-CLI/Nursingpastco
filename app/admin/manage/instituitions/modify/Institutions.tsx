import { getInstituitions } from "@/app/lib/instituitions";
import { ModifyInstituition } from "./Modify";
import { RetryButton } from "@/app/ui/Retry";
import { InstitutionType } from "@/app/types/types";

type Type = {
  instituitions?: InstitutionType[];
  error?: string;
};

export default async function Instituitions() {
  const res: Type = await getInstituitions();
  return (
    <div className="instituitions">
      {res.instituitions && (
        <>
          <h2>instituitions</h2>
          {res.instituitions.length > 0 && (
            <>
              {res.instituitions.map((instituition) => (
                <ModifyInstituition
                  key={instituition.id}
                  instituition={instituition}
                />
              ))}
            </>
          )}
        </>
      )}

      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
    </div>
  );
}
