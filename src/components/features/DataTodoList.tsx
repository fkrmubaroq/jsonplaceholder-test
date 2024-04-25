import { SpinnerIcon } from "@/components/Spinner";
import TodoItem from "@/components/features/TodoItem";
import {
  type Todo
} from "@/store/api";

export default function DataTodoList({
  data,
  isLoading,
}: {
  data: Todo[] | undefined;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <SpinnerIcon />
        </div>
      ) : (
        data?.map((item, key) => <TodoItem key={key} data={item} />)
      )}
    </>
  );
}
