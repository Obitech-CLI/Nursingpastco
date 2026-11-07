import ReadPDF from "./Read";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ url?: string; title?: string }>;
}) {
  const { url, title } = await searchParams;

  if (!url || !title)
    return (
      <main>
        <h2>read online</h2>
        <p>something went wrong. go back and try again</p>
      </main>
    );
  return (
    <main className="read-online">
      <h3>read online</h3>
      <ReadPDF url={url} title={title} />
    </main>
  );
}
