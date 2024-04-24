import {
  type Todo
} from "@/store/api";
import cn from "classnames";

export default function TodoItem({ data }: { data: Todo }) {
  return (
    <div
      className={cn(" text-white rounded-md cursor-pointer p-3 relative", {
        "bg-green-500 hover:bg-green-600": data.completed,
        "bg-gray-800 hover:bg-gray-900": !data.completed,
      })}
    >
      {data.title}
    </div>
  );
}
