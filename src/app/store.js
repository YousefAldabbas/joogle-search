import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "../features/SearchSlice";

export const store = configureStore({
  reducer: {
    search: SearchReducer,
  }
});
