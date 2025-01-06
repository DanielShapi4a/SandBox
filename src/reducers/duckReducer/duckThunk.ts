import { createAsyncThunk } from "@reduxjs/toolkit";
import { DuckState } from "./duckInitialState";

export const loadDucks = createAsyncThunk(
  "ducks/load",
  async (_, { rejectWithValue }) => {
    try {
      const data = await window.electronAPI.loadData();
      return data as DuckState[];
    } catch (error) {
      console.error("Failed to load ducks data:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);
