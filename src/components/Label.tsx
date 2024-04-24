import cn from "classnames";
export default function Label({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"label">) {
  return (
    <label className={cn("font-medium text-sm", className)} {...props}>
      {children}
    </label>
  );
}
