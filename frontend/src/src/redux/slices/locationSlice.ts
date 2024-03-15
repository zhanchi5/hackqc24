/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { createSlice, } from '@reduxjs/toolkit';
import {getLocationCoordinates} from "../thunks/LocationThunk.ts";

interface LocationState
{
  isLoading:boolean
  location:[];
  error: string | null;
}

const initialState: LocationState = {
  isLoading:false,
  location: [],
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
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
      .addCase(getLocationCoordinates.pending, (state) =>
      {
        state.isLoading = true;
      })
      .addCase(getLocationCoordinates.fulfilled, (state, action) =>
      {
        state.isLoading = false;
        state.location = action.payload;
      })
      .addCase(getLocationCoordinates.rejected, (state, action) =>
      {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to get parent location';
      })

  },
});

export const { clearErrors } = locationSlice.actions;
export default locationSlice.reducer;
