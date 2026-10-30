import { lazy, Suspense } from "react";
import type { Book } from "@/types/bibliotheque";

const PdfReader = lazy(() =>
  import("./Flipbook").then((m) => ({ default: m.Flipbook }))
);

export function BookReader({ book }: { book: Book }) {
  if (book.format === "html") {
    return (
      <iframe
        src={book.source}
        title={book.title}
        className="w-full h-full border-0 bg-transparent"
        allow="fullscreen"
      />
    );
  }
  return (
    <Suspense
      fallback={
        <div className="h-full grid place-items-center font-body italic text-moonlight">
          Ouverture du grimoire…
        </div>
      }
    >
      <PdfReader pdfUrl={book.source} />
    </Suspense>
  );
}
