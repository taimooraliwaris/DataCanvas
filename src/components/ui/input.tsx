import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md bg-card px-3 text-sm text-foreground shadow-border transition-[box-shadow] duration-150 ease-out placeholder:text-muted-foreground/80 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:shadow-border-hover disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
