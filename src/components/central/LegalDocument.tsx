function isSectionTitle(line: string) {
  return /^\d+\.\s/.test(line);
}

export function LegalDocument({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).map((block) => block.trim()).filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl">
      {blocks.map((block, index) => {
        if (isSectionTitle(block)) {
          return <h2 key={`${block}-${index}`} className="mt-14 text-2xl font-bold first:mt-0 md:text-3xl">{block}</h2>;
        }

        if (block.startsWith("• ")) {
          return (
            <ul key={`${block}-${index}`} className="my-6 space-y-2 pl-5 text-base leading-7 text-muted-foreground">
              {block.split("\n").map((item) => <li key={item} className="list-disc">{item.slice(2)}</li>)}
            </ul>
          );
        }

        return <p key={`${block}-${index}`} className="mt-5 text-base leading-8 text-muted-foreground">{block}</p>;
      })}
    </div>
  );
}