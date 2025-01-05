import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Map as OLMap, View } from "ol";

export const createMap = (targetId: string): OLMap => {
  return new OLMap({
    target: targetId, // The ID of the HTML element where the map will be rendered
    layers: [
      new TileLayer({
        source: new OSM(), // OpenStreetMap layer
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });
};
