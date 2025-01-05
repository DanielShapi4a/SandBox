import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DuckState, initialState } from "./duckInitialState";

let nextId = 1;

export const duckSlice = createSlice({
  name: "duck",
  initialState,
  reducers: {
    addDuck: (state, action: PayloadAction<Omit<DuckState, "id">>) => {
      state.push({
        id: nextId++,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        name: action.payload.name,
      });
      console.log("added duck", action.payload);
    },
    setDuckLocation: (
      state,
      action: PayloadAction<{ id: number; longitude: number; latitude: number }>
    ) => {
      const duck = state.find((d) => d.id === action.payload.id);
      if (duck) {
        duck.longitude = action.payload.longitude;
        duck.latitude = action.payload.latitude;
        console.log("set duck location", action.payload);
      }
    },
    setDuckName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const duck = state.find((d) => d.id === action.payload.id);
      if (duck) {
        duck.name = action.payload.name;
        console.log("set duck name", action.payload);
      }
    },
  },
});

export const { addDuck, setDuckLocation, setDuckName } = duckSlice.actions;

export default duckSlice.reducer;
