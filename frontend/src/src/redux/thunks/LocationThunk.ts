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

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {getLocationEndPoint} from "../apiCalls.ts";
// Async Thunks
export const getLocationCoordinates = createAsyncThunk(
    'cates/getAllHousesAvailable',
    async (_, thunkAPI):Promise<any>=>
    {
        try
        {
            const { data } = await axios
                .get(getLocationEndPoint,
                    {withCredentials:true});
            return thunkAPI.fulfillWithValue(data);
        }
        catch (error)
        {
            if(axios.isAxiosError(error) && error.response)
            {
                return thunkAPI.rejectWithValue(error.response.data.message)
            }
            else
            {
                return thunkAPI.rejectWithValue('Error occurred during the request.');
            }
        }
    }
);