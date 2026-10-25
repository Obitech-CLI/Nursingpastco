import ReadPDF from "./Read";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ url?: string; title?: string }>;
}) {
  const { url, title } = await searchParams;

  if (!url || !title) return <p>PDF URL missing or title</p>;
  return <ReadPDF url={url} title={title} />;
}
