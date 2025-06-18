import data from "&/puzzle/data.json";
import { createSlice } from "@reduxjs/toolkit";

export const { reducer } = createSlice({
  name: "puzzles",
  initialState: data.map((game) => ({ active: false, beaten: false, game })),
  reducers: {},
});
