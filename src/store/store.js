// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import interviewReducer from "./interviewSlice";

export const store = configureStore({
  reducer: {
    modals: modalReducer,
    interviews: interviewReducer,
  },
});
