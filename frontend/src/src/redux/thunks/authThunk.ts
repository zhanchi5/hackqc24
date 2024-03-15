

/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {authUserEndPoint, loginEndPoint} from "../apiCalls.ts";
// Async Thunks
export const loginThunk = createAsyncThunk(
    'cates/getAllHousesAvailable',
    async (_, thunkAPI):Promise<any>=>
    {
        try
        {
            const { data } = await axios
                .get(loginEndPoint,
                    {withCredentials:true},);
            // console.log(data)
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
export const getAuthUser = createAsyncThunk(
    'cates/getAuthUser',
    async (_, thunkAPI):Promise<any>=>
    {
        try
        {
            const { data } = await axios
                .get(authUserEndPoint,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Cookie': 'session=eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InVzZXIxMjMifQ.ZfOrUQ.MrIQDCp_UcxPvepxxVatuK6qAWY; HttpOnly; Path=/',
                        },
                        withCredentials:true
                    })
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