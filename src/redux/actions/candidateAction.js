import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_API_URL = `${import.meta.env.VITE_API_URL}/candidates`;
const getToken = localStorage.getItem("token")
const token = `Bearer ${getToken}`

// Thunks for async actions


// Add Candidate
export const addCandidate = createAsyncThunk('candidates/add', async(candidate, {rejectWithValue}) => {
    try 
    {
        const response = await axios.post(`${AUTH_API_URL}`, candidate, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token
            }
        });
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// List Candidate
export const getCandidateList = createAsyncThunk('candidates/list', async(_, {rejectWithValue}) => {
    try 
    {
        const response = await axios(`${AUTH_API_URL}`, {headers: {Authorization: token}});
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// List Candidate
export const getAllCandidateList = createAsyncThunk('candidates/all', async(_, {rejectWithValue}) => {
    try 
    {
        const response = await axios(`${AUTH_API_URL}/all`, {headers: {Authorization: token}});
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})


// Update Candidate
export const updateCandidate = createAsyncThunk('candidates/update', async(candidate, {rejectWithValue}) => {
    const {_id, ...data} = candidate
    console.log(_id);
    
    try 
    {
        const response = await axios.put(`${AUTH_API_URL}/${_id}/status`, data, {headers: {Authorization: token}});
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// Delete Candidate
export const deleteCandidate = createAsyncThunk('candidates/delete', async(id, {rejectWithValue}) => {
    try 
    {
        const response = await axios.delete(`${AUTH_API_URL}/${id}`, {headers: {Authorization: token}});
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// Metric data
export const metric = createAsyncThunk('candidates/metric', async(_, {rejectWithValue}) => {
    try 
    {
        const response = await axios.get(`${AUTH_API_URL}/metric`, {headers: {Authorization: token}});
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})