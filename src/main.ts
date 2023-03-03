import './style.css';

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const layer = new FeatureLayer({
    portalItem: {
        id: "f9e348953b3848ec8b69964d5bceae02"
    },
    outFields: ["SEASON"]
});

const map = new ArcGISMap({
    basemap: "gray-vector",
    layers: [layer]
});

const view = new MapView({
    map,
    container: "viewDiv",
    center: [-98, 40],
    zoom: 4
})
