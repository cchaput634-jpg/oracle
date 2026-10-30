import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { cn } from "@/lib/utils";

// Worker servi en statique depuis /public — version strictement alignée
// sur celle que react-pdf embarque (évite les mismatchs main/worker).
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface Props {
  pdfUrl: string;
}

/** Chaque page du livre doit être forwardRef pour react-pageflip */
const BookPage = forwardRef<
  HTMLDivElement,
  { pageNumber: number; width: number; className?: string }
>(({ pageNumber, width, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-[#f4ead1] text-ink overflow-hidden select-none",
        className
      )}
    >
      <Page
        pageNumber={pageNumber}
        width={width}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        loading={
          <div className="w-full h-full grid place-items-center text-sepia font-body italic">
            …
          </div>
        }
      />
    </div>
  );
});
BookPage.displayName = "BookPage";

export function Flipbook({ pdfUrl }: Props) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  // Taille responsive : max 1100 px large (2 pages de 550), hauteur = largeur / ratio page
  useEffect(() => {
    const compute = () => {
      const el = containerRef.current;
      if (!el) return;
      const availW = Math.min(el.clientWidth, 1100);
      const availH = Math.max(window.innerHeight - 160, 400);
      // Ratio A4 par défaut : 1 / sqrt(2) ≈ 0.707
      const ratio = 0.707;
      const singleW = Math.min(availW / 2, availH * ratio);
      const w = Math.floor(singleW);
      const h = Math.floor(w / ratio);
      setSize({ w, h });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const docFile = useMemo(() => ({ url: pdfUrl }), [pdfUrl]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <Document
        file={docFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div className="h-96 grid place-items-center font-body italic text-moonlight">
            Ouverture du grimoire…
          </div>
        }
        error={
          <div className="h-96 grid place-items-center font-body italic text-destructive">
            Impossible d'ouvrir ce livre.
          </div>
        }
      >
        {size && numPages && (
          <HTMLFlipBook
            width={size.w}
            height={size.h}
            size="fixed"
            minWidth={240}
            maxWidth={700}
            minHeight={340}
            maxHeight={990}
            drawShadow
            flippingTime={700}
            usePortrait={size.w < 400}
            showCover
            mobileScrollSupport
            onFlip={(e: { data: number }) => setCurrentPage(e.data)}
            className="shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            style={{}}
            startPage={0}
            startZIndex={0}
            autoSize
            maxShadowOpacity={0.5}
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <BookPage
                key={i}
                pageNumber={i + 1}
                width={size.w}
                className={i === 0 ? "bg-wood-gradient" : ""}
              />
            ))}
          </HTMLFlipBook>
        )}
      </Document>

      {numPages && (
        <p className="mt-4 font-body italic text-moonlight text-sm">
          Page {currentPage + 1} / {numPages}
          <span className="ml-3 opacity-70">
            — glissez les coins ou cliquez pour tourner
          </span>
        </p>
      )}
    </div>
  );
}
