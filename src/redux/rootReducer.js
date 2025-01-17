import { combineReducers } from "@reduxjs/toolkit";
import candidateReducer from "./slices/candidateSlice"
import userReducer from "./slices/userSlice"

const rootReducer = combineReducers({
    candidate: candidateReducer,
    user: userReducer
})

export default rootReducer