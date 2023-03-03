import './style.css';

import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Legend from "@arcgis/core/widgets/Legend";

// symbology
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";

const colors = ["#d92b30", "#3cccb4", "#ffdf3c", "#c27c30", "#f260a1"];

const commonProperties: Partial<InstanceType<typeof SimpleLineSymbol>> = {
    width: 4,
    style: "solid"
};

const fwySym = new SimpleLineSymbol({
    ...commonProperties,
    color: colors[0]
});
const hwySym = new SimpleLineSymbol({
    ...commonProperties,
    color: colors[1]
});
const stateSym = new SimpleLineSymbol({
    ...commonProperties,
    color: colors[2]
});
const majorSym = new SimpleLineSymbol({
    ...commonProperties,
    color: colors[3]
});
const otherSym = new SimpleLineSymbol({
    ...commonProperties,
    color: colors[4]
});

const hwyRenderer = new UniqueValueRenderer({
    legendOptions: {
        title: "Route type"
    },
    defaultSymbol: otherSym,
    defaultLabel: "Other",
    field: "RTTYP",

    uniqueValueInfos: [
        {
            value: "I", // code for interstates/freeways
            symbol: fwySym,
            label: "Interstate"
        },
        {
            value: "U", // code for U.S. highways
            symbol: hwySym,
            label: "US Highway"
        },
        {
            value: "S", // code for U.S. highways
            symbol: stateSym,
            label: "State Highway"
        },
        {
            value: "M", // code for U.S. highways
            symbol: majorSym,
            label: "Major road"
        }
    ]
});

const layer = new FeatureLayer({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/TIGER_Roads_2021_view/FeatureServer/0",
    renderer: hwyRenderer,
    title: "USA Freeway System",
    minScale: 0,
    maxScale: 0,
    definitionExpression: "MTFC = 'Primary Road'",
    orderBy: [
        {
            valueExpression: `
              Decode( $feature.RTTYP,
                "I", 1,
                "U", 2,
                "S", 3,
                "M", 4,
              100 );
            `,
            order: "ascending"
        }
    ]
});

const map = new ArcGISMap({
    basemap: "dark-gray-vector",
    layers: [layer]
});

const view = new MapView({
    container: "viewDiv",
    map,
    constraints: {
        snapToZoom: false
    },
    center: [-95.4327, 29.77624],
    scale: 544504
});

view.ui.add(new Legend({ view }), "bottom-left");
