import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from ".";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const apiSlice = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], number>({
      query: (page) => {
        const limit = 10;
        const offset = page === 1 ? 0 : (page - 1) * limit;
        return `/todos?_start=${offset}&_limit=${limit}`;
      },
    }),
    insertTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos`,
        method: "POST",
        body: todo,
      }),
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useInsertTodoMutation,
  util: { getRunningQueriesThunk },
} = apiSlice;

export const { getAllTodos } = apiSlice.endpoints;
