/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { configureStore, } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import locationSlice from "./slices/locationSlice.ts";
import housesSlice from "./slices/housesSlice.ts";
import reviewsSlice from "./slices/reviewsSlice.ts";
import authSlice from "./slices/authSlice.ts";
export const useAppDispatch: () => AppDispatch = useDispatch

const store = configureStore({
  reducer: {
    auth:authSlice,
    house:housesSlice,
    review:reviewsSlice,
    location:locationSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
