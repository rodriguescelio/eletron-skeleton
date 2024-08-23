import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {}

const initialState: GlobalState = {};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;
