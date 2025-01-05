import { RootState } from "../../store";
import { DuckState } from "./duckInitialState";

export const selectAllDucks = (state: RootState): DuckState[] => state.duck;

export const selectDuckById = (
  state: RootState,
  duckId: number
): DuckState | undefined => {
  return state.duck.find((duck) => duck.id === duckId);
};

export const selectDuckByName = (
  state: RootState,
  duckName: string
): DuckState | undefined => {
  return state.duck.find((duck) => duck.name === duckName);
};

export const selectDuckByLocation = (
  state: RootState,
  longitude: number,
  latitude: number
): DuckState | undefined => {
  return state.duck.find(
    (duck) => duck.longitude === longitude && duck.latitude === latitude
  );
};
