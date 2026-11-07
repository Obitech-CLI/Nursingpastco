import { getNMCCountries } from "@/app/lib/categories";
import { NMCCountryType } from "@/app/types/types";
import { RetryButton } from "@/app/ui/Retry";
import Country from "./Country";

type Type = {
  error?: string;
  countries?: NMCCountryType[];
};

export default async function Countries() {
  const res: Type = await getNMCCountries();
  return (
    <div className="countries">
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
      {res.countries?.length && (
        <h3 style={{ marginTop: "2rem" }}>available countries</h3>
      )}
      {res.countries?.length && (
        <div className="country">
          {res.countries.map((country) => (
            <Country key={country.id} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
