import React from "react";
import ReactDOM from "react-dom/client";
import { MapsApp } from "./MapsApp";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiamhvc3VhdGVzdCIsImEiOiJjbGFpbW44M28wNDJoM3FsZW0xYnV6cjU3In0.i6jD0miQa-ql0NWiaN8kJw";

if (!navigator.geolocation) {
  alert("Tú navegador no tiene opción de Geolocation");
  throw new Error("Tú navegador no tiene opción de Geolocation");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
