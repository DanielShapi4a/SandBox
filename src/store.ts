import { configureStore } from "@reduxjs/toolkit";
import duckSlice from "./reducers/duckReducer/duckReducer";

export const store = configureStore({
  reducer: {
    duck: duckSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
