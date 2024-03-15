/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { createSlice, } from '@reduxjs/toolkit';
import {getAllHouseReviews} from "../thunks/reviewsThunks.ts";

interface ReviewsState
{
    isLoading: boolean;
    reviews:[];
    error: string | null;
}

const initialState: ReviewsState = {
    isLoading: true,
    reviews: [],
    error: null,
};

const reviewsSlice = createSlice({
    name: 'reviews',
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
            .addCase(getAllHouseReviews.pending, (state) =>
            {
                state.isLoading = true;
            })
            .addCase(getAllHouseReviews.fulfilled, (state, action) =>
            {
                state.isLoading = false;
                state.reviews = action.payload;
            })
            .addCase(getAllHouseReviews.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to get parent reviews';
            })


    },
});

export const { clearErrors } = reviewsSlice.actions;
export default reviewsSlice.reducer;
