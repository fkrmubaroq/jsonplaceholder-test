import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export const apiSlice = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], number >({
      query: (page) => {
        const limit = 10;
        const offset = page === 1 ? 0 : (page - 1) * limit;
        return `/todos?_start=${offset}&_limit=${limit}`;
      }
    }),
    insertTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos`,
        method: "POST",
        body: todo,
      }),
    })
  }),
});

export const { useGetAllTodosQuery, useInsertTodoMutation } = apiSlice;
