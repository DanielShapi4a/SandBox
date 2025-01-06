import { createAsyncThunk } from "@reduxjs/toolkit";
import { DuckState } from "./duckInitialState";

export const loadDucks = createAsyncThunk("ducks/load", async () => {
  const data = await window.electronAPI.loadData();
  return data as DuckState[];
});
