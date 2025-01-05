import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { createMap } from "../utils/createMap";

const OpenLayersMap: React.FC = () => {
  useEffect(() => {
    const map = createMap("map-container");

    return () => map.setTarget();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "700px",
        border: "5px solid #ccc",
      }}
      id="map-container"
    />
  );
};

export default OpenLayersMap;
