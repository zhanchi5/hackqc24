/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { createSlice, } from '@reduxjs/toolkit';
import {getAuthUser, loginThunk} from "../thunks/authThunk.ts";

interface UserState
{
  isLoading: boolean;
  user: any;
  error: string | null;
}

const initialState: UserState = {
  isLoading: true,
  user: {},
  error: null,
};

const authSlice = createSlice({
  name: 'user',
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
      .addCase(loginThunk.pending, (state) =>
      {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) =>
      {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) =>
      {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to get parent user';
      })

        .addCase(getAuthUser.pending, (state) =>
      {
        state.isLoading = true;
      })
      .addCase(getAuthUser.fulfilled, (state, action) =>
      {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getAuthUser.rejected, (state, action) =>
      {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to get parent user';
      })


  },
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;
