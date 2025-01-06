import { useState } from "react";
import { Box, Button } from "@mui/material";
import OpenLayersMap from "./componenets/Map";
import { FormModal } from "./componenets/FormModal";
import { useSelector } from "react-redux";
import { selectAllDucks } from "./reducers/duckReducer/duckSelector";

export const App = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const ducks = useSelector(selectAllDucks);

  const handleSaveDucks = async () => {
    try {
      await window.electronAPI.saveData(ducks);
      console.log("Ducks data saved successfully!");
    } catch (error) {
      console.error("Failed to save ducks data:", error);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OpenLayersMap />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => setIsMapOpen(true)}>
          Add a Location
        </Button>
        <Button variant="outlined" onClick={handleSaveDucks}>
          Save Ducks
        </Button>
      </Box>

      {isMapOpen && (
        <FormModal setIsMapOpen={setIsMapOpen} isMapOpen={isMapOpen} />
      )}
    </Box>
  );
};

export default App;
