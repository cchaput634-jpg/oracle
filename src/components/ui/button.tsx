import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-display tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-wood-deep disabled:pointer-events-none disabled:opacity-50 no-tap cursor-pointer",
  {
    variants: {
      variant: {
        gold:
          "bg-gold-gradient text-wood-deep border border-gold-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.4)] hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_6px_20px_rgba(201,162,74,0.5)] active:scale-[0.97]",
        ghost:
          "bg-transparent text-gold border border-gold/60 hover:bg-gold/15 hover:border-gold active:scale-[0.97]",
        parchment:
          "bg-parchment text-wood-deep border border-gold-deep/60 hover:bg-parchment-deep hover:border-gold-deep active:scale-[0.97]",
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
