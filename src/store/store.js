import modalReducer from "./modalSlice";
import interviewReducer from "./interviewSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const interviewPersistConfig = {
  key: "interviews",
  storage,
  whitelist: ["interviews"],
};

const persistedInterviewReducer = persistReducer(
  interviewPersistConfig,
  interviewReducer
);

const rootReducer = combineReducers({
  modals: modalReducer,
  interviews: persistedInterviewReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
