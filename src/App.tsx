import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import OpenLayersMap from "./componenets/Map";
import { FormModal } from "./componenets/FormModal";
import { useSelector } from "react-redux";
import { selectAllDucks } from "./reducers/duckReducer/duckSelector";

export const App = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const ducks = useSelector(selectAllDucks);
  console.log("All our ducks are:", ducks);
  return (
    <Box
      style={{
        width: "1200px",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OpenLayersMap />
      <Button variant="contained" onClick={() => setIsMapOpen(true)}>
        Add a Location
      </Button>
      {isMapOpen && (
        <FormModal setIsMapOpen={setIsMapOpen} isMapOpen={isMapOpen} />
      )}
    </Box>
  );
};

export default App;
