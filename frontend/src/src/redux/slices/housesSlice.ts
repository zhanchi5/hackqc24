/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { createSlice, } from '@reduxjs/toolkit';
import {getAllHousesAvailable} from "../thunks/housesThunk.ts";

interface HousesState
{
  isLoading: boolean;
  houses:[];
  error: string | null;
}

const initialState: HousesState = {
  isLoading: true,
  houses: [],
  error: null,
};

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    clearErrors: (state) =>
    {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllHousesAvailable.pending, (state) =>
      {
        state.isLoading = true;
      })
      .addCase(getAllHousesAvailable.fulfilled, (state, action) =>
      {
        state.isLoading = false;
        state.houses = action.payload;
      })
      .addCase(getAllHousesAvailable.rejected, (state, action) =>
      {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to get parent houses';
      })


  },
});

export const { clearErrors } = housesSlice.actions;
export default housesSlice.reducer;
