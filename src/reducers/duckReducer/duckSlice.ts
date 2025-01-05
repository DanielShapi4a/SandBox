import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DuckState, initialState } from "./duckInitialState";

export const duckSlice = createSlice({
  name: "duck",
  initialState,
  reducers: {
    addDuck: (state, action: PayloadAction<Omit<DuckState, "id">>) => {
      const nextId = state.length ? state[state.length - 1].id + 1 : 1;

      const newDuck = {
        id: nextId,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        name: action.payload.name,
      };
      state.push(newDuck);
      const updatedDucks = JSON.stringify(state);
      localStorage.setItem("ducksData", updatedDucks);
      console.log("added duck", newDuck);
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
    setDucks: (state, action: PayloadAction<DuckState[]>) => {
      return action.payload;
    },
  },
});

export const { addDuck, setDuckLocation, setDuckName, setDucks } =
  duckSlice.actions;

export default duckSlice.reducer;
