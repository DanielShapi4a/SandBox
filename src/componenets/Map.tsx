import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { createMap } from "../utils/createMap";
import { useDispatch, useSelector } from "react-redux";
import { selectAllDucks } from "../reducers/duckReducer/duckSelector";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import duckImage from "../../public/Duck.png";
import { setDucks } from "../reducers/duckReducer/duckSlice";
import { AppDispatch } from "../store";

const markerStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: duckImage,
    scale: 0.05,
  }),
});

const OpenLayersMap: React.FC = () => {
  const ducks = useSelector(selectAllDucks);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const storedDucks = localStorage.getItem("ducksData");
    if (storedDucks) {
      try {
        const parsedDucks = JSON.parse(storedDucks);
        console.log("Parsed ducksData:", parsedDucks);
        dispatch(setDucks(parsedDucks));
      } catch (error) {
        console.error("Failed to parse stored ducks data:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("ducks updated:", ducks);

    const map = createMap("map-container");

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    ducks.forEach((duck) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([duck.longitude, duck.latitude])),
      });
      feature.setStyle(markerStyle);
      vectorSource.addFeature(feature);
    });

    map.addLayer(vectorLayer);

    return () => map.setTarget();
  }, [ducks]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "100%",
        border: "5px solid #ccc",
      }}
      id="map-container"
    />
  );
};

export default OpenLayersMap;
