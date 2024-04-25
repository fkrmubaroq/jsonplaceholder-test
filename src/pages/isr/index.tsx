import DataTodoList from "@/components/features/DataTodoList";
import Pagination from "@/components/features/Pagination";
import { wrapper } from "@/store";
import {
  getAllTodos,
  getRunningQueriesThunk,
  useGetAllTodosQuery,
} from "@/store/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  let response;
  let page = 1;
  do {
    response = await store.dispatch(getAllTodos.initiate(page));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    page++;
  } while (response.data?.length);

  return {
    props: {},
    revalidate: 10,
  
  };
});

export default function Isr() {
  const router = useRouter();
  const query = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: posts, isLoading } = useGetAllTodosQuery(currentPage, {
    skip: router.isFallback,
  });

  useEffect(() => {
    const page = query.get("page") || 1;
    setCurrentPage(+page);
  }, [currentPage, query]);

  const onPagination = (page: number) => {
    setCurrentPage((currentPage) => currentPage + page);
    router.replace(`?page=${currentPage + page}`);
  };

  return (
    <div className="flex flex-col gap-y-3 max-w-[800px] mx-auto my-5 px-4">
      <h1 className="text-center text-xl">
        Todo List with Incremental Static Regeneration (ISR)
      </h1>
      <DataTodoList data={posts} isLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        onNext={onPagination}
        onPrev={onPagination}
      />
    </div>
  );
}
