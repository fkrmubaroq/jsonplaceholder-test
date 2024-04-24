import cn from "classnames";
import React from "react";

export default function Button({ className, children, ...props }: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={cn(
        "px-3 py-2 text-sm hover:bg-blue-600 border-none rounded-md bg-blue-500 text-white disabled:opacity-40",
        className
      )}
    >
      {children}
    </button>
  );
}