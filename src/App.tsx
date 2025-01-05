import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import OpenLayersMap from "./componenets/Map";
import { FormModal } from "./componenets/FormModal";
import { useSelector } from "react-redux";
import { selectAllDucks } from "./reducers/duckReducer/duckSelector";

export const App = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const ducks = useSelector(selectAllDucks);

  const handleSaveDucks = () => {
    const data = JSON.stringify(ducks, null, 2);

    localStorage.setItem("ducksData", data);

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ducks.json";
    a.click();
    URL.revokeObjectURL(url);
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
        <Button variant="outlined" onClick={() => handleSaveDucks()}>
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
