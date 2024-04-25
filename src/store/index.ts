import { apiSlice } from "@/store/api";
import {
  configureStore
} from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
import { modalSlice } from "./modalSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      modal: modalSlice.reducer,
    },
    middleware: (gDM) =>
      gDM().concat(apiSlice.middleware),
  });

export default makeStore;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
