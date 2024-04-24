import cn from "classnames";
import React, { useId } from "react";
import style from "./Checkbox.module.scss";
export default function Checbox({
  text,
  className,
  onChange
}: React.ComponentPropsWithoutRef<"input"> & { text?: string }) {
  const id = useId();
  return (
    <div className={cn("flex items-center relative ", className)}>
      <input
        onChange={onChange}
        id={`default-checkbox-${id}`}
        type="checkbox"
        value=""
        className={cn(
          "opacity-0 w-[23px] h-[23px] absolute cursor-pointer",
          style["input-checkbox"]
        )}
      />
      <div className="w-[20px] h-[20px]  border border-gray-400 rounded bg-white flex justify-center items-center">
        <CheckIcon />
      </div>
      <label htmlFor={`default-checkbox-${id}`} className="ms-2 cursor-pointer">
        {text || ""}
      </label>
    </div>
  );
}

const CheckIcon = ({ className }: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        viewBox="0 0 20 20"
        fill="white"
        stroke="white"
        strokeWidth="1"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

CheckIcon.displayName = "CheckIcon";
