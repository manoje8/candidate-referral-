import { createSlice } from "@reduxjs/toolkit";
import { addCandidate, deleteCandidate, getAllCandidateList, getCandidateList, updateCandidate } from "../actions/candidateAction";

const initialState = {
    candidates: [],
    error: "",
    isLoading: false,
}

const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    extraReducers: (builder) => {
        builder

            // Add Candidate
            .addCase(addCandidate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCandidate.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
            })
            .addCase(addCandidate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // Get Candidates
            .addCase(getCandidateList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCandidateList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.candidates = action.payload
            })
            .addCase(getCandidateList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Get all Candidates
            .addCase(getAllCandidateList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCandidateList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.candidates = action.payload
            })
            .addCase(getAllCandidateList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Candidates
            .addCase(updateCandidate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.candidates = state.candidates.map(candidate => {
                    return candidate._id == action.payload._id ? action.payload : candidate
                })
            })
            .addCase(updateCandidate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            

            // Delete Candidates
            .addCase(deleteCandidate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCandidate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.candidates = state.candidates.filter(candidate => candidate._id != action.payload.id)
            })
            .addCase(deleteCandidate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default candidateSlice.reducer