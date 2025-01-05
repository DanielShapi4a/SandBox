import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DuckState {
  longitude: number;
  latitude: number;
  name: string;
}

const initialState: DuckState = {
  longitude: 0,
  latitude: 0,
  name: "",
};

export const duckSlice = createSlice({
  name: "duck",
  initialState,
  reducers: {
    setDuckLocation: (state, action: PayloadAction<DuckState>) => {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },
    setDuckName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setDuckLocation, setDuckName } = duckSlice.actions;

export default duckSlice.reducer;
