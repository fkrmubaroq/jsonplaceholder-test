import ActionTodo from "@/components/features/ActionTodo";
import DataTodoList from "@/components/features/DataTodoList";
import Pagination from "@/components/features/Pagination";
import { wrapper } from "@/store";
import {
  getAllTodos,
  getRunningQueriesThunk,
  useGetAllTodosQuery,
  useInsertTodoMutation,
  type Todo,
} from "@/store/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const page = context.query?.page || 1;
    if (page) {
      store.dispatch(getAllTodos.initiate(+page));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        page: +page,
      },
    };
  });



export default function Home({ page }: { page: number }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const { data: posts, isLoading } = useGetAllTodosQuery(page);
  const [insertTodo, { isLoading: isLoadingInsert }] = useInsertTodoMutation();
  const onSave = async (payload: Todo, cb: () => void) => {
    const response = await insertTodo(payload).unwrap();
    cb();
    alert(`Success add todo, response : \n ${JSON.stringify(response)}`);
  };

  const onPagination = (page: number) => {
    setCurrentPage((currentPage) => currentPage + page);
    router.replace(`?page=${currentPage + page}`);
  };

  return (
    <div className="flex flex-col gap-y-3 max-w-[800px] mx-auto my-5 px-4">
      <h1 className="text-center text-xl">Todo List</h1>
      <ActionTodo isLoading={isLoadingInsert} onSave={onSave} />
      <DataTodoList data={posts} isLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        onNext={onPagination}
        onPrev={onPagination}
      />
    </div>
  );
}
