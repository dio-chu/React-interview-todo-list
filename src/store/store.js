import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import interviewReducer from "./interviewsSlice";
enableMapSet();
export const store = configureStore({
  reducer: {
    interviews: interviewReducer,
  },
});
