import { configureStore } from "@reduxjs/toolkit";

import wordReducers from "./wordSlice";

export const store = configureStore({
    reducer:{
        words:wordReducers
    }
})