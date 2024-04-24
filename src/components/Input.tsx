import cn from "classnames";
export default function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "focus:outline-blue-600 tracking-wide text-sm text-dark  h-10 border border-gray-300 placeholder:text-gray-500 pl-[10px] rounded-md pr-[5px]",
        className
      )}
    />
  );
}

export function ContainerInput({ children, className }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-x-5 w-full", className)}>{children}</div>;
}
