import Button from "@/components/Button";
import { SpinnerIcon } from "@/components/Spinner";
import ModalAddTodo from "@/components/features/ModalAddTodo";
import Pagination from "@/components/features/Pagination";
import TodoItem from "@/components/features/TodoItem";
import {
  useGetAllTodosQuery,
  useInsertTodoMutation,
  type Todo,
} from "@/store/api";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: posts, isLoading } = useGetAllTodosQuery(currentPage);
  const [insertTodo, { isLoading:isLoadingInsert }] = useInsertTodoMutation();
  const onSave = async (payload: Todo, cb: () => void) => {
    const response = await insertTodo(payload).unwrap();
    cb();
    alert(`Success add todo, response : \n ${JSON.stringify(response)}`);
  };

  const onPagination = (page: number) => { 
    setCurrentPage((currentPage) => currentPage + page);
  }

  return (
    <div className="flex flex-col gap-y-3 max-w-[800px] mx-auto my-5 px-4">
      <h1 className="text-center text-xl">Todo List</h1>
      <ActionTodo
        isLoading={isLoadingInsert}
        onSave={onSave}
      />
      <DataTodoList
        data={posts}
        isLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        onNext={onPagination}
        onPrev={onPagination}
      />
    </div>
  );
}

function DataTodoList({
  data,
  isLoading,
}: {
  data: Todo[] | undefined;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]" >
        <SpinnerIcon />
        </div>
      ) : (
        data?.map((item, key) => <TodoItem key={key} data={item} />)
      )}
    </>
  );
}

function ActionTodo({ onSave, isLoading } : { onSave:(payload: Todo, cb: () => void) => void, isLoading: boolean}) {
  const [show, setShow] = useState<boolean>(false);

  const onClickSave = (payload: Todo) => {
    onSave(payload, () => {
      setShow(false);
    });  
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setShow(true)}>Add Todo</Button>
        <ModalAddTodo
          show={show}
          onHide={() => setShow(false)}
          isLoading={isLoading}
          onSave={onClickSave}
        />
      </div>
    </>
  );
}
