"use client";

import MapComponent from "./MapComponent";

/**
 * Map Directions Renderer
 * @param options Google Map Directions Renderer options
 * @param events events listeners
 */
const DirectionsRenderer = ({ options, ...events }) => {
  return (
    <MapComponent
      component="DirectionsRenderer"
      options={options}
      events={events}
    />
  );
};

export default DirectionsRenderer;
