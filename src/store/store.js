import { configureStore } from "@reduxjs/toolkit";
import { api } from "../RtkQuery/apiSlice";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});