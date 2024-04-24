import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalState = {
  show: boolean;
  contentModalComponent: React.ReactNode;
};

const initialState: ModalState = {
  show: false,
  contentModalComponent: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<React.ReactNode>) => {
      state.show = true;
      state.contentModalComponent = action.payload;
    },
    hideModal: (state) => {
      state.show = false;
      state.contentModalComponent = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
