import { getInstituitions } from "@/app/lib/instituitions";
import { Instituition } from "./Instituition";
import styles from "./instituitions.module.css";
import { RetryButton } from "../ui/Retry";

export interface InstitutionType {
  id: number;
  name: string;
  abbr: string;
  about: string;
  logo: any;
}

type Type = {
  instituitions?: InstitutionType[];
  error?: string;
};

export default async function NursingInstituitions({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const res: Type = await getInstituitions(search);
  return (
    <div className={styles.instituitions}>
      {res.instituitions && (
        <>
          {res.instituitions.length > 0 && (
            <>
              {res.instituitions.map((instituition) => (
                <Instituition
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
