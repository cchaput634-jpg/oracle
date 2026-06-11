import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export interface InterpretationPayload {
  title: string;
  meta?: string;
  image: string;
  interpretation: string;
  imageRotated?: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payload: InterpretationPayload | null;
}

export function InterpretationModal({ open, onOpenChange, payload }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {payload && (
          <div className="flex flex-col max-h-[92svh]">
            <header className="px-8 pt-8 pb-4 border-b border-gold/30 text-center">
              <DialogTitle className="font-display">{payload.title}</DialogTitle>
              {payload.meta && (
                <DialogDescription className="mt-2">
                  {payload.meta}
                </DialogDescription>
              )}
            </header>

            <div className="px-6 pt-6 pb-2 flex justify-center">
              <img
                src={payload.image}
                alt={payload.title}
                draggable={false}
                className="block h-56 md:h-72 w-auto rounded-md gold-border select-none"
                style={
                  payload.imageRotated
                    ? { transform: "rotate(180deg)" }
                    : undefined
                }
              />
            </div>

            <div className="px-8 pb-8 pt-4 overflow-y-auto fancy-scroll">
              <p className="font-body text-lg md:text-xl leading-relaxed text-parchment text-center italic">
                « {payload.interpretation} »
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
